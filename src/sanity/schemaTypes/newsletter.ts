import { EnvelopeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'newsletter',
  title: 'Newsletter',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'subject',
      title: 'Subject',
      description: 'Please write an attention-grabbing headline',
      type: 'string',
    }),
    defineField({
      name: 'preview',
      title: 'Preview',
      description:
        'Please provide a short preview of your email - ex/ "Enjoy a super sweet discount, on us!"',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'Add email content here',
      type: 'blockContent',
    }),
  ],
})
