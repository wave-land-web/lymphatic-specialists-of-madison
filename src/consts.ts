// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Lymphatic Specialists of Madison'
export const SITE_DESCRIPTION =
  'Lymphatic Specialists of Madison provides expert lymphatic massage and Manual Lymphatic Drainage Massage in Madison, WI. Support healing, reduce swelling, and restore balance.'
export const SITE_URL = 'https://lymphaticspecialistsofmadison.com'
export const NAVIGATION = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services/manual-lymphatic-drainage-massage',
    children: [
      {
        label: 'Manual Lymphatic Drainage Massage',
        href: '/services/manual-lymphatic-drainage-massage',
      },
      {
        label: 'Pre/Post-Surgical Manual Lymphatic Drainage Massage',
        href: '/services/pre-post-surgical-manual-lymphatic-drainage-massage',
      },
    ],
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'About',
    children: [
      {
        label: 'Our Team',
        href: '/our-team',
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

export const SERVICES = [
  {
    title: 'Manual Lymphatic Drainage Massage',
    description:
      'A gentle form of bodywork that stimulates the lymphatic system to reduce edema/excess inflammation, remove toxins and waste, and encourage a healthy immune system. This type of treatment is appropriate for most people (see contraindications). Very beneficial for patients: post-cancer, with lipidema/lymphedema, post-surgical, with autoimmune conditions, long COVID, with systemic inflammatory conditions such as Lyme, PCOS, endometriosis, and many more.',
    learnMoreHref: '/services/manual-lymphatic-drainage-massage',
    bookNowHref:
      'https://booksy.com/en-us/1554807_lymphatic-specialists-of-madison_massage_39663_madison#ba_s=sh_1',
    imageKey: 'lympaticDrainage',
  },
  {
    title: 'Post-Surgical Manual Lymphatic Drainage Massage',
    description:
      'Post-surgical Manual Lymphatic Drainage Massage helps clear out excess lymph fluid caused by surgical trauma, which assists in faster healing and pain reduction. Scar tissue work is also performed when indicated to help increase mobility of scar and reduce adhesions after surgery which will help with overall appearance of surgical site and surrounding areas, increased lymphatic flow and help reduce future scar adhesion complications.',
    learnMoreHref: '/services/pre-post-surgical-manual-lymphatic-drainage-massage',
    bookNowHref:
      'https://booksy.com/en-us/1554807_lymphatic-specialists-of-madison_massage_39663_madison#ba_s=sh_1',
    imageKey: 'postSurgical',
  },
]

export const TESTIMONIALS = [
  {
    id: 1,
    text: 'Courtney is so amazing at what she does. Regular sessions with her keep my lymphedema and tightness from scarring controlled. For anyone that has gone through breast cancer treatments I highly recommend Courtney to treat the Lymphedema and scar tissue that happens as a result and provide you relief.',
    author: '60 Min Manual Lymphatic Drainage Massage',
    rating: 5,
  },
  {
    id: 2,
    text: 'Courtney is amazing! I have lots of health issues and a sluggish lymph system. I have been seeing her regularly for a while now and her work is helping me tremendously. She is extremely knowledgeable, and in general a super fun and engaging person. Highly recommended seeing her!',
    author: 'Returning Client 60 Min. MLD',
    rating: 5,
  },
  {
    id: 3,
    text: "Warm, welcoming atmosphere. Courtney is kind and professional and thorough. I'd recommend her to anyone looking for a lymph massage.",
    author: '60 Min Manual Lymphatic Drainage Massage',
    rating: 5,
  },
]
