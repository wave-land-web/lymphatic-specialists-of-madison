export const prerender = false

import { render } from '@react-email/render'
import type { APIContext, APIRoute } from 'astro'
import { RESEND_AUDIENCE_ID } from 'astro:env/server'
import NewsletterNotification from '../../../components/emails/NewsletterNotification'
import Welcome from '../../../components/emails/Welcome'
import { resend } from '../../../lib/resend'
import { sanityClient } from '../../../sanity/lib/client'

export const POST: APIRoute = async (context: APIContext) => {
  const { request } = context

  try {
    // Parse form data
    const formData = await request.formData()

    // Check honeypot field (spam protection)
    const botField = formData.get('bot-field') as string
    if (botField) {
      console.log('Spam submission detected via honeypot field')
      return new Response(
        JSON.stringify({
          success: false,
          error: 'An error occurred while processing your request.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    const email = formData.get('email')?.toString()

    // Validate email
    if (!email) {
      console.log('No email provided')
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email address is required',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase()

    // Check if user already exists in Sanity
    const existingUser = await sanityClient.fetch(`*[_type == "user" && email == $email][0]`, {
      email: normalizedEmail,
    })
    let isNewUser = false
    let result

    if (existingUser) {
      // Update existing user's subscription status
      result = await sanityClient
        .patch(existingUser._id)
        .set({
          isSubscribed: true,
          updatedAt: new Date().toISOString(),
        })
        .commit()
    } else {
      // Create new user in Sanity
      result = await sanityClient.create({
        _type: 'user',
        firstName: '', // Will be empty since we only have email
        lastName: '', // Will be empty since we only have email
        email: normalizedEmail,
        phone: '', // Optional field, leaving empty
        isSubscribed: true,
        createdAt: new Date().toISOString(),
      })
      isNewUser = true
    }

    // Add contact to Resend audience (for email campaigns)
    try {
      const createResponse = await resend.contacts.create({
        email: normalizedEmail,
        firstName: '', // We don't have this info from the newsletter form
        lastName: '', // We don't have this info from the newsletter form
        unsubscribed: false,
        audienceId: RESEND_AUDIENCE_ID,
      })

      if (createResponse.error) {
        // Contact might already exist, that's okay
        console.log(
          'Contact already exists in Resend audience or other error:',
          createResponse.error
        )
      } else {
        console.log('Successfully added contact to Resend audience:', createResponse.data?.id)
      }
    } catch (resendError) {
      console.error('Failed to add contact to Resend audience:', resendError)
      // Continue execution - this is not critical for the subscription process
    }

    // Send emails based on user status
    const emailsToSend = []

    if (isNewUser) {
      // Welcome HTML email for new user using React Email template
      const welcomeHtml = await render(
        Welcome({
          email: normalizedEmail,
        })
      )

      // Generate text version of Welcome email
      const welcomeText = await render(
        Welcome({
          email: normalizedEmail,
        }),
        {
          plainText: true,
        }
      )

      emailsToSend.push({
        from: 'Lymphatic Specialists of Madison <hello@lymphaticspecialistsofmadison.com>',
        to: [normalizedEmail],
        subject: 'Welcome to Lymphatic Specialists of Madison!',
        html: welcomeHtml,
        text: welcomeText,
      })
    }

    // Admin notification for all subscriptions (new and existing) using React Email template
    const notificationHtml = await render(
      NewsletterNotification({
        email: normalizedEmail,
        isSubscribed: true,
        isNewUser,
      })
    )

    // Generate text version of admin notification email
    const notificationText = await render(
      NewsletterNotification({
        email: normalizedEmail,
        isSubscribed: true,
        isNewUser,
      }),
      {
        plainText: true,
      }
    )

    emailsToSend.push({
      from: 'Lymphatic Specialists Website <hello@lymphaticspecialistsofmadison.com>',
      to: ['cnrolnick@gmail.com'],
      subject: isNewUser
        ? `New newsletter subscription from ${normalizedEmail}`
        : `Newsletter subscription updated for ${normalizedEmail}`,
      html: notificationHtml,
      text: notificationText,
    })

    // Send all emails in batch
    if (emailsToSend.length > 0) {
      try {
        const { data: batchData, error: batchError } = await resend.batch.send(emailsToSend)

        if (batchError) {
          console.error('Error sending batch emails:', batchError)
        } else {
          console.log(`Successfully sent ${emailsToSend.length} emails:`, batchData)
        }
      } catch (emailError) {
        console.error('Email send error:', emailError)
        // Continue execution - user is subscribed even if email fails
      }
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: isNewUser
          ? 'Successfully subscribed to newsletter! Check your email for a welcome message.'
          : 'Welcome back! Your subscription has been updated.',
        id: result._id,
        isSubscribed: true,
        isNewUser,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to subscribe. Please try again.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
