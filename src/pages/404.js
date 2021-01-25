import React from "react"
import FindTweet from "../components/findTweet"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h2>404: Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <FindTweet label={"Double check the URL is correct and try again:"}/>
  </Layout>
)

export default NotFoundPage
