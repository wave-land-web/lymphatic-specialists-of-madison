// @ts-check
import netlify from '@astrojs/netlify'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import sanity from '@sanity/astro'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField, fontProviders } from 'astro/config'
import { SITE_URL } from './src/consts'

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
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
      SANITY_STUDIO_SECRET_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
      }),
      RESEND_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
      RESEND_AUDIENCE_ID: envField.string({
        context: 'server',
        access: 'secret',
      }),
      ALTCHA_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
    },
    validateSecrets: true,
  },
  integrations: [
    sitemap({
      lastmod: new Date(),
      filter: (page) =>
        page !== 'https://lymphaticspecialistsofmadison.com/subscribed/' &&
        page !== 'https://lymphaticspecialistsofmadison.com/unsubscribed/' &&
        page !== 'https://lymphaticspecialistsofmadison.com/privacy-policy/' &&
        page !== 'https://lymphaticspecialistsofmadison.com/terms-of-use/' &&
        page !== 'https://lymphaticspecialistsofmadison.com/cookie-policy/' &&
        page !== 'https://lymphaticspecialistsofmadison.com/404/',
    }),
    sanity({
      projectId: 'hr4xqyhv',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/admin',
      apiVersion: '2025-07-23',
    }),
    react(),
  ],
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    // @ts-ignore - Type compatibility with Tailwind CSS v4 plugin
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
    fonts: [
      {
        provider: fontProviders.local(),
        name: 'Nuckle Thin',
        cssVariable: '--font-nuckle-thin',
        options: {
          variants: [
            {
              src: ['./src/assets/fonts/nuckle-thin.woff', './src/assets/fonts/nuckle-thin.woff2'],
              weight: 100,
              style: 'normal',
              display: 'swap',
            },
          ],
        },
      },
      {
        provider: fontProviders.local(),
        name: 'Nuckle Semibold',
        cssVariable: '--font-nuckle-semibold',
        options: {
          variants: [
            {
              src: [
                './src/assets/fonts/nuckle-semibold.woff',
                './src/assets/fonts/nuckle-semibold.woff2',
              ],
              weight: 600,
              style: 'normal',
              display: 'swap',
            },
          ],
        },
      },
      {
        provider: fontProviders.local(),
        name: 'Nuckle Regular',
        cssVariable: '--font-nuckle-regular',
        options: {
          variants: [
            {
              src: [
                './src/assets/fonts/nuckle-regular.woff',
                './src/assets/fonts/nuckle-regular.woff2',
              ],
              weight: 400,
              style: 'normal',
              display: 'swap',
            },
          ],
        },
      },
      {
        provider: fontProviders.local(),
        name: 'Nuckle Medium',
        cssVariable: '--font-nuckle-medium',
        options: {
          variants: [
            {
              src: [
                './src/assets/fonts/nuckle-medium.woff',
                './src/assets/fonts/nuckle-medium.woff2',
              ],
              weight: 500,
              style: 'normal',
              display: 'swap',
            },
          ],
        },
      },
      {
        provider: fontProviders.local(),
        name: 'Nuckle Light',
        cssVariable: '--font-nuckle-light',
        options: {
          variants: [
            {
              src: [
                './src/assets/fonts/nuckle-light.woff',
                './src/assets/fonts/nuckle-light.woff2',
              ],
              weight: 300,
              style: 'normal',
              display: 'swap',
            },
          ],
        },
      },
      {
        provider: fontProviders.local(),
        name: 'Nuckle Hairline',
        cssVariable: '--font-nuckle-hairline',
        options: {
          variants: [
            {
              src: [
                './src/assets/fonts/nuckle-hairline.woff',
                './src/assets/fonts/nuckle-hairline.woff2',
              ],
              weight: 100,
              style: 'normal',
              display: 'swap',
            },
          ],
        },
      },
      {
        provider: fontProviders.local(),
        name: 'Nuckle ExtraLight',
        cssVariable: '--font-nuckle-extralight',
        options: {
          variants: [
            {
              src: [
                './src/assets/fonts/nuckle-extralight.woff',
                './src/assets/fonts/nuckle-extralight.woff2',
              ],
              weight: 200,
              style: 'normal',
              display: 'swap',
            },
          ],
        },
      },
      {
        provider: fontProviders.local(),
        name: 'Nuckle Bold',
        cssVariable: '--font-nuckle-bold',
        options: {
          variants: [
            {
              src: ['./src/assets/fonts/nuckle-bold.woff', './src/assets/fonts/nuckle-bold.woff2'],
              weight: 900,
              style: 'normal',
              display: 'swap',
            },
          ],
        },
      },
      {
        provider: fontProviders.local(),
        name: 'Copernicus Italic',
        cssVariable: '--font-copernicus-italic',
        options: {
          variants: [
            {
              src: [
                './src/assets/fonts/copernicus-italic.woff',
                './src/assets/fonts/copernicus-italic.woff2',
              ],
              weight: 400,
              style: 'italic',
              display: 'swap',
            },
          ],
        },
      },
      {
        provider: fontProviders.local(),
        name: 'Copernicus Regular',
        cssVariable: '--font-copernicus-regular',
        options: {
          variants: [
            {
              src: [
                './src/assets/fonts/copernicus-regular.woff',
                './src/assets/fonts/copernicus-regular.woff2',
              ],
              weight: 400,
              style: 'normal',
              display: 'swap',
            },
          ],
        },
      },
      {
        provider: fontProviders.local(),
        name: 'Copernicus Regular 2',
        cssVariable: '--font-copernicus-regular-2',
        options: {
          variants: [
            {
              src: [
                './src/assets/fonts/copernicus-regular-2.woff',
                './src/assets/fonts/copernicus-regular-2.woff2',
              ],
              weight: 400,
              style: 'normal',
              display: 'swap',
            },
          ],
        },
      },
    ],
  },
})
