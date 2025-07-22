import type { APIRoute } from 'astro'

export const prerender = false // Enable server-side rendering for form handling

export const POST: APIRoute = async ({ request }) => {
  // TODO: Implement intake form submission handling
  // This will handle the intake form from /intake-form page
  // Will use createIntakeFormSubmission from formSubmissions.ts
  // Client is available as sanityClient imported above

  return new Response(
    JSON.stringify({
      success: false,
      error: 'Intake form API not yet implemented.',
    }),
    {
      status: 501,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
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
