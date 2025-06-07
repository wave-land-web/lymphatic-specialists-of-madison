// @ts-check
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
})
