import React from 'react'
import Prismic from '@prismicio/client'
import { Date, Link, RichText } from 'prismic-reactjs'
import { queryRepeatableDocuments } from './../utils/queries'

const apiEndpoint = 'https://sam-onboarding-nuxt-blog.cdn.prismic.io/api/v2'
const Client = Prismic.client(apiEndpoint)

function Home({ post }) {
  return (
    <div>
      <p>Test Deploy</p>
      <RichText render={post?.data?.title} />
      <code>{JSON.stringify(post)}</code>
    </div>
  )
}

export async function getStaticProps({
  params,
  preview = null,
  previewData = {}
}) {
  const { ref } = previewData
  const post =
    (await Client.getByUID('page', 'home', ref ? { ref } : null)) || {}
  return {
    props: {
      preview,
      post
    }
  }
}

// export async function getStaticPaths() {
//   const documents = await queryRepeatableDocuments((doc) => doc.uid === 'home')
//   return {
//     paths: documents.map((doc) => `/`),
//     fallback: true
//   }
// }

export default Home
