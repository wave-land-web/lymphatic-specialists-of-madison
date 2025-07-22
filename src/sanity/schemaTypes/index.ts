import type { SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent'
import contactForm from './contactForm'
import intakeForm from './intakeForm'
import post from './post'
import user from './user'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, post, user, intakeForm, contactForm],
}
