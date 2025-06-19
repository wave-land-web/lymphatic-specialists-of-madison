// @ts-check
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  integrations: [sitemap()],
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    plugins: [
      tailwindcss(),
      sitemap({
        lastmod: new Date(),
      }),
    ],
  },

  adapter: netlify({
    imageCDN: false, // See: <https://docs.astro.build/en/guides/integrations-guide/netlify/#netlify-image-cdn-support>
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
          },
        ],
      },
    ],
  },
})
