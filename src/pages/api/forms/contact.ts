import { render } from '@react-email/render'
import type { APIRoute } from 'astro'
import ContactNotification from '../../../components/emails/ContactNotification'
import { resend } from '../../../lib/resend'
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailAddress)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid email address format.',
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

    // Send admin notification email
    try {
      console.log('Sending admin notification for contact form submission...')

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

      // Send admin notification email
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'Lymphatic Specialists Website <test@wavelandweb.com>',
        to: ['josh@wavelandweb.com'],
        subject: `New contact form submission from ${firstName} ${lastName}`,
        html: notificationHtml,
        text: notificationText,
      })

      if (emailError) {
        console.error('Error sending admin notification:', emailError)
      } else {
        console.log('Successfully sent admin notification:', emailData)
      }
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError)
      // Continue execution - form submission succeeded even if email failed
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your message! We will get back to you as soon as possible.',
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
