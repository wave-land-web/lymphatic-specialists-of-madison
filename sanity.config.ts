import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  projectId: 'hr4xqyhv',
  dataset: 'production',
  plugins: [structureTool({ structure })],
  schema,
  name: 'madison-lymphatics-and-manual-therapy',
})
