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
    children: [
      {
        label: 'Careers',
        href: '/careers',
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
    title: 'Manual Lymphatic Drainage',
    description:
      'A gentle form of bodywork that stimulates the lymphatic system to reduce edema/systemic inflammation, remove toxins and waste, and encourage a healthy immune system. This type of treatment is appropriate for most (see contraindications). Very beneficial for patients: post-cancer, with lipidema/lymphedema, dealing with autoimmune conditions, with long COVID, with systemic inflammatory conditions such as Lyme, PCOS, endometriosis and many more.',
    learnMoreHref: '/services/manual-lymphatic-drainage',
    bookNowHref:
      'https://booksy.com/en-us/689566_madison-lymphatics-and-bodywork_massage_39663_madison',
    imageKey: 'placeholderTwo',
  },
  {
    title: 'Post-Surgical Manual Lymphatic Drainage',
    description:
      'Post-surgical manual lymphatic drainage helps clear out excess lymph fluid caused by surgical trauma, which assists in faster healing and pain reduction. Scar tissue work is also performed when appropriate to help reduce adhesions after surgery which will help with overall appearance of surgical site and surrounding areas, increased lymphatic flow and help reduce future scar adhesion complications.',
    learnMoreHref: '/services/pre-post-surgical-manual-lymphatic-drainage',
    bookNowHref:
      'https://booksy.com/en-us/689566_madison-lymphatics-and-bodywork_massage_39663_madison',
    imageKey: 'placeholderFour',
  },
  {
    title: 'Therapeutic Bodywork',
    description:
      "An effective way to treat a wide array of tension and soft-tissue injury related conditions. Massage therapy sessions are designed for the client's individual needs in order to provide the optimal outcome. Massage therapy can be beneficial for not only relaxing tense muscle tissue, but also can help to calm an over active sympathetic nervous system.",
    learnMoreHref: '/services/therapeutic-bodywork',
    bookNowHref:
      'https://booksy.com/en-us/689566_madison-lymphatics-and-bodywork_massage_39663_madison',
    imageKey: 'placeholderFive',
  },
]

export const TESTIMONIALS = [
  {
    id: 1,
    text: 'Carmela was amazing! She has a magical touch and was incredibly knowledgeable about my post surgery needs with the lymphatic drain massage. I left feeling relaxed and more comfortable. She also made several recommendations to help me at home, in between appointments. I am looking forward to becoming a regular client.',
    author: 'Returning Client 60 Min. MLD',
    rating: 5,
  },
  {
    id: 2,
    text: 'Courtney is so amazing at what she does. Regular sessions with her keep my lymphedema and tightness from scarring controlled. For anyone that has gone through breast cancer treatments I highly recommend Courtney to treat the Lymphedema and scar tissue that happens as a result and provide you relief.',
    author: '60 Min Manual Lymphatic Drainage',
    rating: 5,
  },
  {
    id: 3,
    text: "Couldn't be happier with my experiences so far with the lymphatic drainage massage with Carmela. My c section scar was 3.5 years old and I wasn't optimistic that it could be helped, glad I was wrong!",
    author: 'Returning Client 60 Min. MLD',
    rating: 5,
  },
  {
    id: 4,
    text: 'Courtney is amazing! I have lots of health issues and a sluggish lymph system. I have been seeing her regularly for a while now and her work is helping me tremendously. She is extremely knowledgeable, and in general a super fun and engaging person. Highly recommended seeing her!',
    author: 'Returning Client 60 Min. MLD',
    rating: 5,
  },
  {
    id: 5,
    text: 'Carmela has been wonderful. She is knowledgeable about the kind of care I need and is so empathetic. She has helped ease my recovery and I look forward to continuing my care with her. The space is clean and professional. I highly recommend Therapeutic Massage Center if Middleton.',
    author: 'Returning Client 60 Min. MLD',
    rating: 5,
  },
  {
    id: 6,
    text: "Warm, welcoming atmosphere. Courtney is kind and professional and thorough. I'd recommend her to anyone looking for a lymph massage.",
    author: '60 Min Manual Lymphatic Drainage',
    rating: 5,
  },
]
