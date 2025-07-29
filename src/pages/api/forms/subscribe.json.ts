export const prerender = false

import type { APIContext, APIRoute } from 'astro'
import { RESEND_AUDIENCE_ID } from 'astro:env/server'
import { resend } from '../../../lib/resend'
import { sanityClient } from '../../../sanity/lib/client'

export const POST: APIRoute = async (context: APIContext) => {
  const { request } = context

  try {
    // Parse form data
    const formData = await request.formData()
    const email = formData.get('email')?.toString()

    // Validate email
    if (!email) {
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

    // Check if user already exists in Sanity
    const existingUser = await sanityClient.fetch(`*[_type == "user" && email == $email][0]`, {
      email,
    })

    let isNewUser = false

    if (existingUser) {
      // Update existing user's subscription status
      await sanityClient.patch(existingUser._id).set({ isSubscribed: true }).commit()
    } else {
      // Create new user in Sanity
      await sanityClient.create({
        _type: 'user',
        firstName: '', // Will be empty since we only have email
        lastName: '', // Will be empty since we only have email
        email, // Required field
        phone: '', // Optional field, leaving empty
        isSubscribed: true,
        createdAt: new Date().toISOString(),
      })
      isNewUser = true
    }

    // Add contact to Resend audience (for both new and existing users to ensure they're in the audience)
    try {
      // Check if contact already exists in Resend audience
      const existingContact = await resend.contacts.get({
        email,
        audienceId: RESEND_AUDIENCE_ID,
      })

      if (existingContact.error) {
        // Contact doesn't exist, create new one
        await resend.contacts.create({
          email,
          firstName: '', // We don't have this info from the newsletter form
          lastName: '', // We don't have this info from the newsletter form
          unsubscribed: false,
          audienceId: RESEND_AUDIENCE_ID,
        })
      } else {
        // Contact exists, update to ensure they're subscribed
        await resend.contacts.update({
          email,
          audienceId: RESEND_AUDIENCE_ID,
          unsubscribed: false,
        })
      }
    } catch (resendError) {
      console.error('Resend audience error:', resendError)
      // Continue execution - we've already saved to Sanity
      // but log the error for monitoring
    }

    // Send welcome email only for new users
    if (isNewUser) {
      try {
        await resend.emails.send({
          // TODO: Update with your verified domain
          from: 'Lymphatic Specialists of Madison <hello@acme.com>',
          to: [email],
          subject: 'Welcome to Lymphatic Specialists of Madison!',
          html: /*html*/ `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #2c5530;">Welcome to Lymphatic Specialists of Madison!</h1>
              <p>Thank you for subscribing to our newsletter. We're excited to share expert tips, health insights, and updates about lymphatic health with you.</p>
              <p>You'll receive our latest content directly in your inbox, including:</p>
              <ul>
                <li>Expert lymphatic health tips</li>
                <li>Wellness insights and advice</li>
                <li>Updates on our services</li>
                <li>Educational content about manual lymphatic drainage</li>
              </ul>
              <p>If you have any questions or would like to schedule a consultation, feel free to <a href="https://madisonlymphatics.com/contact" style="color: #2c5530;">contact us</a>.</p>
              <p>Best regards,<br>The Madison Lymphatics Team</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="font-size: 12px; color: #666;">
                You're receiving this email because you subscribed to our newsletter at madisonlymphatics.com. 
                If you no longer want to receive these emails, you can unsubscribe at any time.
              </p>
            </div>
          `,
          text: /*text*/ `
Welcome to Madison Lymphatics!

Thank you for subscribing to our newsletter. We're excited to share expert tips, health insights, and updates about lymphatic health with you.

You'll receive our latest content directly in your inbox, including:
- Expert lymphatic health tips
- Wellness insights and advice  
- Updates on our services
- Educational content about manual lymphatic drainage

If you have any questions or would like to schedule a consultation, feel free to contact us at https://madisonlymphatics.com/contact.

Best regards,
The Madison Lymphatics Team

---
You're receiving this email because you subscribed to our newsletter at madisonlymphatics.com. If you no longer want to receive these emails, you can unsubscribe at any time.
          `,
        })
      } catch (emailError) {
        console.error('Welcome email send error:', emailError)
        // Continue execution - user is subscribed but welcome email failed
        // This is not critical to the subscription process
      }
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: isNewUser
          ? 'Successfully subscribed to newsletter! Check your email for a welcome message.'
          : 'Welcome back! Your subscription has been updated.',
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
