import React from 'react'
import Prismic from '@prismicio/client'
import { Date, Link, RichText } from 'prismic-reactjs'
const apiEndpoint = 'https://sam-onboarding-nuxt-blog.cdn.prismic.io/api/v2'

const Client = Prismic.client(apiEndpoint)

export default function Home() {
  const [doc, setDocData] = React.useState(null)

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await Client.query(
        Prismic.Predicates.at('document.type', 'page')
      )
      if (response) {
        setDocData(response.results[0])
      }
    }
    fetchData()
  }, [])
  return (
    <div>
      <p>Test Deploy</p>
      <code>{JSON.stringify(doc)}</code>
    </div>
  )
}
