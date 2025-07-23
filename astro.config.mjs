// @ts-check
import netlify from '@astrojs/netlify'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import sanity from '@sanity/astro'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  // TODO: replace with prod site URL
  site: 'http://localhost:4321',
  env: {
    schema: {
      PUBLIC_SANITY_STUDIO_PROJECT_ID: envField.string({
        context: 'client',
        access: 'public',
        default: 'hr4xqyhv',
      }),
      PUBLIC_SANITY_STUDIO_DATASET: envField.string({
        context: 'client',
        access: 'public',
        default: 'production',
      }),
      SANITY_STUDIO_WRITE_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        default:
          'kl3cCkuNZ9G3yCFQ3RRG5NcXXxa1ptJiNX1uCZZJOIvoEvMDmDMf7nEsOXn5PipwPXYAbo6AG0ilmftry8wUTBVu4ixbuY8HpjeAMwxayxjzMizZg3CVE6NpLrvGUfe4xpALlnPQLVas6CHLfknfrBglUIc2vbmsF2PThkErFDuCGfQ32wL',
      }),
      SANITY_STUDIO_AUTH_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        default:
          'skEvngLWwT2JbuSwkUWgnkiyH96NKo3IM350OBuGfOp1fMqgtqWmuxg5g8ijeSrcPFVNRkI5ikg18BQVRXQkxr705JXW6oKH5RRTpMBqxos2sugvoYFwtRClnxY5LsGAs0A3IPjw1FDeIaUitapt0doF7UMeIUA0s7bTvZ6Upw65h7Mi0F41',
      }),
    },
  },
  integrations: [
    sitemap(),
    sanity({
      // TODO: replace with ENV variable
      projectId: 'hr4xqyhv',
      dataset: 'production',
      // Set useCdn to false if you're building statically.
      useCdn: false,
      studioBasePath: '/admin',
      apiVersion: '2025-07-01',
    }),
    react(),
  ],
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    layout: 'constrained',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  adapter: netlify({
    imageCDN: false,
    cacheOnDemandPages: true,
  }),

  experimental: {
    // SEE: https://docs.astro.build/en/reference/experimental-flags/fonts/#local-font-variants
    fonts: [
      {
        provider: 'local',
        name: 'Nuckle Thin',
        cssVariable: '--font-nuckle-thin',
        variants: [
          {
            src: ['./src/assets/fonts/nuckle-thin.woff', './src/assets/fonts/nuckle-thin.woff2'],
            weight: '100',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
      {
        provider: 'local',
        name: 'Nuckle Semibold',
        cssVariable: '--font-nuckle-semibold',
        variants: [
          {
            src: [
              './src/assets/fonts/nuckle-semibold.woff',
              './src/assets/fonts/nuckle-semibold.woff2',
            ],
            weight: '600',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
      {
        provider: 'local',
        name: 'Nuckle Regular',
        cssVariable: '--font-nuckle-regular',
        variants: [
          {
            src: [
              './src/assets/fonts/nuckle-regular.woff',
              './src/assets/fonts/nuckle-regular.woff2',
            ],
            weight: '400',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
      {
        provider: 'local',
        name: 'Nuckle Medium',
        cssVariable: '--font-nuckle-medium',
        variants: [
          {
            src: [
              './src/assets/fonts/nuckle-medium.woff',
              './src/assets/fonts/nuckle-medium.woff2',
            ],
            weight: '500',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
      {
        provider: 'local',
        name: 'Nuckle Light',
        cssVariable: '--font-nuckle-light',
        variants: [
          {
            src: ['./src/assets/fonts/nuckle-light.woff', './src/assets/fonts/nuckle-light.woff2'],
            weight: '300',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
      {
        provider: 'local',
        name: 'Nuckle Hairline',
        cssVariable: '--font-nuckle-hairline',
        variants: [
          {
            src: [
              './src/assets/fonts/nuckle-hairline.woff',
              './src/assets/fonts/nuckle-hairline.woff2',
            ],
            weight: '100',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
      {
        provider: 'local',
        name: 'Nuckle ExtraLight',
        cssVariable: '--font-nuckle-extralight',
        variants: [
          {
            src: [
              './src/assets/fonts/nuckle-extralight.woff',
              './src/assets/fonts/nuckle-extralight.woff2',
            ],
            weight: '200',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
      {
        provider: 'local',
        name: 'Nuckle Bold',
        cssVariable: '--font-nuckle-bold',
        variants: [
          {
            src: ['./src/assets/fonts/nuckle-bold.woff', './src/assets/fonts/nuckle-bold.woff2'],
            weight: '900',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
      {
        provider: 'local',
        name: 'Copernicus Italic',
        cssVariable: '--font-copernicus-italic',
        variants: [
          {
            src: [
              './src/assets/fonts/copernicus-italic.woff',
              './src/assets/fonts/copernicus-italic.woff2',
            ],
            weight: '400',
            style: 'italic',
            display: 'swap',
          },
        ],
      },
      {
        provider: 'local',
        name: 'Copernicus Regular',
        cssVariable: '--font-copernicus-regular',
        variants: [
          {
            src: [
              './src/assets/fonts/copernicus-regular.woff',
              './src/assets/fonts/copernicus-regular.woff2',
            ],
            weight: '400',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
      {
        provider: 'local',
        name: 'Copernicus Regular 2',
        cssVariable: '--font-copernicus-regular-2',
        variants: [
          {
            src: [
              './src/assets/fonts/copernicus-regular-2.woff',
              './src/assets/fonts/copernicus-regular-2.woff2',
            ],
            weight: '400',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    ],
  },
})
