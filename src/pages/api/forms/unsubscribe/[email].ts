export const prerender = false // Enable server-side rendering for form handling

import { RESEND_API_KEY } from 'astro:env/server'
import type { APIRoute } from 'astro'
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

  // Unsubscribe the contact in Resend so Broadcasts skip them too. This uses the
  // account-wide contacts endpoint directly because the installed SDK (v4) requires an
  // audience ID. A 404 just means they were never imported into Resend.
  const resendResponse = await fetch(
    `https://api.resend.com/contacts/${encodeURIComponent(sanitizedEmail)}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unsubscribed: true }),
    },
  ).catch((error: unknown) => error)

  if (
    !(resendResponse instanceof Response) ||
    (!resendResponse.ok && resendResponse.status !== 404)
  ) {
    console.error('Resend unsubscribe failed:', resendResponse)
  }

  // Resend errors are logged but not fatal: Sanity is the source of truth, so always
  // show the `/unsubscribed` page
  return redirect('/unsubscribed', 303)
}
