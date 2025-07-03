import { EarthGlobeIcon, EnvelopeIcon } from '@sanity/icons'

export const structure = (S: any) => {
  return S.list()
    .title('Sanity Studio')
    .items([
      // Website (posts, pages, etc.)
      S.listItem()
        .title('Website')
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title('Website')
            .items([S.documentTypeListItem('post').title('Blog')])
          // TODO: Add pages here
        ),
      // Emails (newsletters, etc.)
      S.listItem()
        .title('Emails')
        .icon(EnvelopeIcon)
        .child(
          S.list()
            .title('Emails')
            .items([S.documentTypeListItem('newsletter').title('Newsletter')])
        ),
    ])
}
