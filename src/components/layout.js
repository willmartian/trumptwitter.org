import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import "./layout.css"

const Layout = ({ children }) => {

  return (
    <>
      <header>
        <nav>
          <Link to={"/"} style={{textDecoration: "none"}}>
            <h1>Trump Twitter Archive</h1>
          </Link>
        </nav>
        <p>This website archives the Tweets of former President Donald J. Trump. On January 8th, 2021, the President was <a href="https://web.archive.org/web/20210109031834/https://blog.twitter.com/en_us/topics/company/2020/suspension.html">permanently banned from Twitter.com</a> after inciting an attack on the United States Capitol.</p>
      </header>
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
