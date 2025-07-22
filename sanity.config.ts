import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  projectId: 'hr4xqyhv',
  dataset: 'production',
  plugins: [structureTool({ structure }), visionTool()],
  schema,
  name: 'madison-lymphatics-and-manual-therapy',
})
