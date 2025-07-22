import { createClient } from '@sanity/client'

/**
 * Sanity client configured for both read and write operations
 */
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  token: import.meta.env.SANITY_AUTH_TOKEN, // Optional: Use if you have a token for write operations
  useCdn: false,
  apiVersion: '2025-07-22',
})

export default sanityClient
