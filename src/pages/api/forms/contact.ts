import { render } from '@react-email/render'
import type { APIRoute } from 'astro'
import ContactNotification from '../../../components/emails/ContactNotification'
import UserContactNotification from '../../../components/emails/UserContactNotification'
import { resend } from '../../../lib/resend'
import { checkSpamProtectionWithAltcha } from '../../../lib/altcha'
import { sanityClient } from '../../../sanity/lib/client'
import {
  createContactFormSubmission,
  type ContactFormData,
} from '../../../sanity/lib/formSubmissions'

export const prerender = false // Enable server-side rendering for form handling

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse form data from the request
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

    // Altcha spam protection
    const spamCheck = await checkSpamProtectionWithAltcha(formData)
    if (spamCheck.isSpam) {
      console.log('Altcha spam protection triggered:', spamCheck.reason)
      return new Response(
        JSON.stringify({
          success: false,
          error: spamCheck.reason || 'Please complete the security challenge.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    // Extract form fields and validate required fields
    const firstName = formData.get('first-name') as string
    const lastName = formData.get('last-name') as string
    const emailAddress = formData.get('email-address') as string
    const phoneNumber = formData.get('phone-number') as string
    const messageBody = formData.get('message') as string
    const subscribeToNewsletter = formData.get('newsletter-subscribe') === 'on'

    // Validate required fields
    if (!firstName || !lastName || !emailAddress) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields: firstName, lastName, and emailAddress are required.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    // Use Sanity client (automatically optimizes for read/write operations)
    const client = sanityClient

    // Prepare contact form data
    const contactData: ContactFormData = {
      firstName,
      lastName,
      emailAddress,
      phoneNumber: phoneNumber || undefined,
      messageBody: messageBody || undefined,
      subscribeToNewsletter,
    }

    // Create contact form submission in Sanity
    const submission = await createContactFormSubmission(client, contactData)

    // Prepare emails to send using batch API
    const emailsToSend = []

    // Send user confirmation email
    try {
      console.log('Preparing user confirmation email for contact form submission...')

      // Generate HTML version of user confirmation
      const userConfirmationHtml = await render(
        UserContactNotification({
          firstName,
        })
      )

      // Generate text version of user confirmation
      const userConfirmationText = await render(
        UserContactNotification({
          firstName,
        }),
        {
          plainText: true,
        }
      )

      emailsToSend.push({
        from: 'Lymphatic Specialists of Madison <hello@lymphaticspecialistsofmadison.com>',
        to: [emailAddress],
        subject: 'Thank you for contacting Lymphatic Specialists of Madison',
        html: userConfirmationHtml,
        text: userConfirmationText,
      })
    } catch (userEmailError) {
      console.error('Failed to prepare user confirmation email:', userEmailError)
      // Continue execution - admin notification can still be sent
    }

    // Send admin notification email
    try {
      console.log('Preparing admin notification for contact form submission...')

      // Generate HTML version of admin notification
      const notificationHtml = await render(
        ContactNotification({
          firstName,
          lastName,
          email: emailAddress,
          phone: phoneNumber || '',
          message: messageBody,
          isSubscribed: subscribeToNewsletter,
        })
      )

      // Generate text version of admin notification
      const notificationText = await render(
        ContactNotification({
          firstName,
          lastName,
          email: emailAddress,
          phone: phoneNumber || '',
          message: messageBody,
          isSubscribed: subscribeToNewsletter,
        }),
        {
          plainText: true,
        }
      )

      emailsToSend.push({
        from: 'Lymphatic Specialists Website <hello@lymphaticspecialistsofmadison.com>',
        to: ['cnrolnick@gmail.com'],
        subject: `New contact form submission from ${firstName} ${lastName}`,
        html: notificationHtml,
        text: notificationText,
      })
    } catch (adminEmailError) {
      console.error('Failed to prepare admin notification email:', adminEmailError)
      // Continue execution - user confirmation can still be sent
    }

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
        // Continue execution - form submission succeeded even if email failed
      }
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message:
          'Thank you for your message! We will get back to you as soon as possible. Please check your email for a confirmation.',
        submissionId: submission._id,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Contact form submission error:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: 'An error occurred while processing your request.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}

// Handle preflight OPTIONS requests for CORS
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
