import type { APIRoute } from 'astro'
import { sanityClient } from '../../../sanity/lib/client'
import {
  createContactFormSubmission,
  type ContactFormData,
} from '../../../sanity/lib/formSubmissions'

export const prerender = false // Enable server-side rendering for form handling

export const POST: APIRoute = async ({ request }) => {
  try {
    // Debug: Check environment variables (using Astro's import.meta.env)
    console.log('Environment check:', {
      projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
      dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
      writeToken: import.meta.env.SANITY_WRITE_TOKEN,
      authToken: import.meta.env.SANITY_AUTH_TOKEN?.length || 0,
    })

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
