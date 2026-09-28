export const prerender = false // Enable server-side rendering for form handling

import { RESEND_AUDIENCE_ID } from 'astro:env/server'
import { render } from '@react-email/render'
import type { APIRoute } from 'astro'
import Unsubscribe from '../../../../components/emails/Unsubscribe'
import { resend } from '../../../../lib/resend'
import { sanityClient } from '../../../../sanity/lib/client'

/**
 * GET request handler for unsubscribing an email.
 *
 * @param params The request parameters.
 * @param redirect The redirect function.
 * @returns The response object.
 */
export const GET: APIRoute = async ({ params, redirect }) => {
  // Extract the email from the URL
  const { email } = params

  // If there is no email in the URL >> return an error
  if (!email) {
    return new Response(null, {
      status: 404,
      statusText: 'Email Not found',
    })
  }

  const sanitizedEmail = email.trim().toLowerCase()

  // Check if user exists in Sanity and update subscription status
  const query = '*[_type == "user" && email == $email][0]'
  const existingUser = await sanityClient.fetch(query, {
    email: sanitizedEmail,
  })

  if (existingUser) {
    await sanityClient
      .patch(existingUser._id)
      .set({
        isSubscribed: false,
        unsubscribedAt: new Date().toISOString(),
      })
      .commit()
  }

  // Handle unsubscription from the Resend audience
  const { data: unsubscribeData, error: unsubscribeError } = await resend.contacts.update({
    email: sanitizedEmail,
    audienceId: RESEND_AUDIENCE_ID,
    unsubscribed: true,
  })

  // Log the response from Resend
  console.log(unsubscribeData, unsubscribeError)

  // Render the Unsubscribe email as plain text
  const text = await render(Unsubscribe({ email: sanitizedEmail }), {
    plainText: true,
  })

  // Send an email to the user confirming their unsubscription
  const { data: unsubscribeEmailData, error: unsubscribeEmailError } = await resend.emails.send({
    from: 'Lymphatic Specialists of Madison <hello@lymphaticspecialistsofmadison.com>',
    to: sanitizedEmail,
    subject: 'You have been unsubscribed from Lymphatic Specialists of Madison',
    react: Unsubscribe({
      email: sanitizedEmail,
    }),
    text,
  })

  // Log the response from Resend
  console.log(unsubscribeEmailData, unsubscribeEmailError)

  // Resend errors are logged above but not fatal: Sanity is the source of truth, so always
  // show the `/unsubscribed` page
  return redirect('/unsubscribed', 303)
}
