import { createClient } from '@sanity/client'

/**
 * Sanity client configured for both read and write operations
 */
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  token: import.meta.env.SANITY_STUDIO_WRITE_TOKEN,
  useCdn: false,
})

export default sanityClient
