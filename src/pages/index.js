import { Link } from "gatsby"
import React from "react"
import FindTweet from "../components/findTweet"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <article>
      <header>
        <h2>Using the archive</h2>
        <p>Simply replace the orginal domain with <em>trumptwitter.org</em>.</p>
      </header>
      <section>
        <p>
          <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/realDonaldTrump/status/98454970654916608">https://<mark class="bad">twitter.com</mark>/realDonaldTrump/status/98454970654916608</a>
        </p>
        <p>
          <Link to="/realDonaldTrump/status/98454970654916608">https://<mark class="good">trumptwitter.org</mark>/realDonaldTrump/status/98454970654916608</Link>
        </p>
        <FindTweet label={"You can also paste a Twitter URL below and be redirected to the archived tweet:"}/>
      </section>
      <section>
        <details open>
          <summary>
            Web Extension
          </summary>
          <p>Install the <em>Trump Twitter Archive Web Extension</em> on your browser to automatically swap broken <mark class="bad">twitter.com</mark> links to Trump's tweets with working <mark class="good">trumptwitter.org</mark> links—on <em>every</em> site you visit.</p>
          <ul>
            <li>
              <a href="https://addons.mozilla.org/en-US/firefox/addon/trump-twitter-archive/">Add to Firefox</a>
            </li>
            <li>
              <p>Add to Chrome <em>(Coming Soon)</em></p>
            </li>
          </ul>
          <p>Want to test if the extension is working? Try clicking on the Twitter link at the top of this page.</p>
          <p>If you have the plugin installed you will be directed to an archived tweet.</p>
        </details>
      </section>
      <section>    
        <details>
          <summary>
              Frequently Asked Questions
          </summary>
          <ul>
            <li>
              <b>Where is your data from?</b>
              <p>
                The scraped tweet data comes from another excellent <a href="https://www.thetrumparchive.com/">project.</a> Said project has been referenced by <em>"FactCheck.org, PolitiFact, Snopes, and Wikipedia, along with almost every major news outlet"</em>, and is considered to be accurate.
              </p>
            </li>
            <li>
              <b><em>Why</em> did you make this archive?</b>
              <p>
                While there are other projects that also preserve Trump's tweets, this project differs from them in that it focuses on presentation, archival referencing, and mitigating <a href="https://en.wikipedia.org/wiki/Link_rot">link rot</a>.
              </p>
            </li>
            <li>
              <b><em>How</em> did you make this archive?</b>
              <p>
                I used <a href="https://developer.mozilla.org/en-US/docs/Learn">HTML, CSS, and JavaScript.</a>
              </p>
              <p>
                The source code for the archive can be found <a href="https://github.com/willmartian/trumptwitter.org">here.</a>
              </p>
            </li>
            <li>
              <b>Can I contact you?</b>
              <p>
                Yes, send an email to <a href="mailto:trumptwitterorg@gmail.com" rel="me">trumptwitterorg@gmail.com</a>
              </p>
            </li>
          </ul>
        </details>
      </section>
    </article>
  </Layout>
)

export default IndexPage
