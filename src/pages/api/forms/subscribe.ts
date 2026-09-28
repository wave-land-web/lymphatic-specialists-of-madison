import type { APIRoute } from 'astro'

export const prerender = false

// The newsletter was retired and nothing on the site posts here anymore.
// Previous implementation (Sanity user + Resend contact) is in git history.
export const ALL: APIRoute = ({ redirect }) => redirect('/unsubscribed', 303)
