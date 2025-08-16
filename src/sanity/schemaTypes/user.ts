import { EnvelopeIcon, UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      description: 'Optional first name',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      description: 'Optional last name',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'email',
      description: 'Required email address',
      validation: (Rule) => Rule.required().error('A valid email address is required'),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Optional phone number',
    }),
    defineField({
      name: 'isSubscribed',
      title: 'Newsletter Subscription',
      type: 'boolean',
      description: 'Whether the user is subscribed to the newsletter',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      description: 'When the user was created',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      description: 'When the user was last updated',
      readOnly: true,
    }),
    defineField({
      name: 'unsubscribedAt',
      title: 'Unsubscribed At',
      type: 'datetime',
      description: 'When the user unsubscribed from the newsletter',
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      isSubscribed: 'isSubscribed',
    },
    prepare(selection) {
      const { firstName, lastName, email, isSubscribed } = selection
      const fullName = `${firstName || ''} ${lastName || ''}`.trim()
      const title = fullName || email || 'Unnamed User'
      const subtitle = email && fullName ? email : ''

      // Use Sanity icons instead of emoji
      const media = isSubscribed ? EnvelopeIcon : UserIcon

      return {
        title,
        subtitle,
        media,
      }
    },
  },
})
