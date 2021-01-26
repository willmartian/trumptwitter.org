import React from "react";

import Layout from "../components/layout"
import SEO from "../components/seo"
import TweetTable from "../components/tweetTable"

const SearchPage = ({ data }) => {

  return (
    <Layout>
      <SEO title="Search Tweets" />
      <h2>Search Tweets</h2>
      <TweetTable />     
    </Layout>
  );
}

export default SearchPage
