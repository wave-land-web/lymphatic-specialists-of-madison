import { createClient } from '@sanity/client'
import { PUBLIC_SANITY_STUDIO_DATASET, PUBLIC_SANITY_STUDIO_PROJECT_ID } from 'astro:env/client'
import { SANITY_STUDIO_WRITE_TOKEN } from 'astro:env/server'

const isProd = import.meta.env.PROD

export const sanityClient = createClient({
  projectId: PUBLIC_SANITY_STUDIO_PROJECT_ID,
  dataset: PUBLIC_SANITY_STUDIO_DATASET || 'production',
  token: SANITY_STUDIO_WRITE_TOKEN,
  // Use CDN in production for performance, fresh data in development
  useCdn: isProd,
  apiVersion: '2025-07-01',
})

export default sanityClient
