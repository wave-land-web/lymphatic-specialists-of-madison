import { createClient } from '@sanity/client'
import { PUBLIC_SANITY_STUDIO_DATASET, PUBLIC_SANITY_STUDIO_PROJECT_ID } from 'astro:env/client'
import { SANITY_STUDIO_SECRET_TOKEN } from 'astro:env/server'

export const sanityClient = createClient({
  projectId: PUBLIC_SANITY_STUDIO_PROJECT_ID,
  dataset: PUBLIC_SANITY_STUDIO_DATASET || 'production',
  token: SANITY_STUDIO_SECRET_TOKEN,
  useCdn: false,
  // Use current date for most recent API version
  apiVersion: '2025-07-23',
})

export default sanityClient
