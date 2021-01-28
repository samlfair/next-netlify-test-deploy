import Prismic from '@prismicio/client'

const linkResolver = (doc) => {
  return '/' + doc.uid
}

export const apiEndpoint =
  'https://sam-onboarding-nuxt-blog.cdn.prismic.io/api/v2'

// Client method to query from the Prismic repo
const Client = (req = null) =>
  Prismic.client(apiEndpoint, createClientOptions(req))

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {}
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {}
  return {
    ...reqOption,
    ...accessTokenOption
  }
}

const Preview = async (req, res) => {
  const { token: ref, documentId } = req.query
  const redirectUrl = await Client(req)
    .getPreviewResolver(ref, documentId)
    .resolve(linkResolver, '/')

  if (!redirectUrl) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  console.log('ref')
  console.log(ref)
  res.setPreviewData({ ref })
  res.writeHead(302, { Location: `${redirectUrl}` })
  res.end()
}

export default Preview
