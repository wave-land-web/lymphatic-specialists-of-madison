import { render } from '@react-email/render'
import AdminFormNotification from '../components/emails/AdminFormNotification'
import { SITE_URL } from '../consts'

const ADMIN_FROM = 'Lymphatic Specialists Website <hello@lymphaticspecialistsofmadison.com>'
const ADMIN_TO = ['cnrolnick@gmail.com']

const FORMS = {
  intake: {
    title: 'New intake form submission',
    message: 'Someone just submitted an intake form on your website. Log in to see their details.',
  },
  contact: {
    title: 'New contact form submission',
    message: 'Someone just sent you a message through your website. Log in to read it.',
  },
} as const

/**
 * Builds the alert Courtney gets for a new form submission. It names the form, the time
 * and a link straight to the document in Studio, and nothing about the person: their
 * details stay in Sanity behind the Studio login. The time also keeps each alert in its
 * own Gmail thread.
 */
export async function buildAdminNotification(
  form: keyof typeof FORMS,
  submission: { _id: string; _type: string },
) {
  const { title, message } = FORMS[form]
  const submittedAt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date())
  const studioUrl = `${SITE_URL}/admin/intent/edit/id=${submission._id};type=${submission._type}`

  const email = AdminFormNotification({ title, message, formName: form, submittedAt, studioUrl })

  return {
    from: ADMIN_FROM,
    to: ADMIN_TO,
    subject: `${title} · ${submittedAt}`,
    html: await render(email),
    text: await render(email, { plainText: true }),
  }
}
