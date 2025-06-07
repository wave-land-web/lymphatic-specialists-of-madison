// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Madison Lymphatic and Manual Therapy'
export const SITE_DESCRIPTION =
  "Madison Lymphatics and Manual Therapy is Madison's first lymphatic-centric clinic. We specialize in Manual Lymphatic Drainage (MLD)." // TODO: change to production description
export const SITE_URL = 'http://localhost:4321' // TODO: change to production url
export const NAVIGATION = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services/manual-lymphatic-drainage',
    children: [
      {
        label: 'Manual Lymphatic Drainage',
        href: '/services/manual-lymphatic-drainage',
      },
      {
        label: 'Pre/Post-Surgical Manual Lymphatic Drainage',
        href: '/services/pre-post-surgical-manual-lymphatic-drainage',
      },
      {
        label: 'Therapeutic Bodywork',
        href: '/services/therapeutic-bodywork',
      },
    ],
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'About',
    href: '/about',
    children: [
      {
        label: 'Our Team',
        href: '/our-team',
      },
      {
        label: 'Join Our Team',
        href: '/join-our-team',
      },
      {
        label: 'FAQ',
        href: '/faq',
      },
    ],
  },
  {
    label: 'Intake Form',
    href: '/intake-form',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]
