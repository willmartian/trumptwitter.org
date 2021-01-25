import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "./layout"
import SEO from "./seo"

import "./tweet.css"

const TweetPage = ({ data }) => {
    const tweet = data.tweetsCsv;
    const cleanBool = (char) => char === 'f' ? 'False' : 'True';
    const getDate = (dateString, outputFormat) => {
        const  dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
            dateObj.getMonth()
        );
        const day = dateObj.getDay();
        const time = dateObj.toLocaleString('en-US', { hour: 'numeric', hour12: true })
        if (outputFormat === "MLA") {
            // ex: 16 June 2014
            return `${day} ${month} ${year}, ${time}`;
        } else if (outputFormat === "APA") { 
            // ex: (2020, September 28)
            return `(${year}, ${month} ${day})`;
        }
    }
    return (
        <Layout>
            <SEO title={"Tweet"}/>
            <section>
                <figure class="tweet">
                    <blockquote cite={`https://twitter.com/realDonaldTrump/status/${tweet.id}`}>
                        <p>{tweet.text}</p>
                    </blockquote>
                    <figcaption>
                        &mdash; @realDonaldTrump
                    </figcaption>
                    <dl>
                        <dt>Date</dt>
                        <dl>{tweet.date + " EST"}</dl>
                        <dt>Retweets</dt>
                        <dl>{tweet.retweets}</dl>
                        <dt>Favorites</dt>
                        <dl>{tweet.favorites}</dl>
                        <dt>Device</dt>
                        <dl>{tweet.device}</dl>
                        <dt>Retweet</dt>
                        <dl>{cleanBool(tweet.isRetweet)}</dl>
                        <dt>Deleted</dt>
                        <dl>{cleanBool(tweet.isDeleted)}</dl>
                        <dt>Flagged</dt>
                        <dl>{cleanBool(tweet.isFlagged)}</dl>
                    </dl>
                </figure>
            </section>
            <section>
                <details>
                    <summary>Cite this Tweet</summary>
                    {/* (2020, September 28) */}
                    <b>APA:</b> {`Trump, D. J. [@realDonaldTrump]. ${getDate(tweet.date, "APA")}. ${tweet.text} [Tweet]. Twitter. https://twitter.com/realDonaldTrump/status/${tweet.id}`}
                    <hr style={{ marginTop: "1em" }}/>
                    <b>MLA:</b> {`Trump, Donald J. (@realDonaldTrump). "${tweet.text}" ${getDate(tweet.date, "MLA")}. Tweet.`}
                </details>
                <details>
                    <summary>Embed this Tweet</summary>
                    <pre>
                        <code>{`<iframe src="https://trumptwitter.org/realDonaldTrump/status/${tweet.id}"></iframe>`}</code>
                    </pre>
                </details>
            </section>
        </Layout>
    )
}

export const query = graphql`
    query($id: String!) {
        tweetsCsv(id: {eq: $id}) {
            id
            date
            isDeleted
            isFlagged
            isRetweet
            device
            favorites
            retweets
            text
        }
    }
`;

TweetPage.propTypes = {
    children: PropTypes.node.isRequired,
}

export default TweetPage
