import type { SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent'
import newsletter from './newsletter'
import post from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, post, newsletter],
}
