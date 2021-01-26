import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "./layout"
import SEO from "./seo"
import Autolinker from 'autolinker';

import "./tweet.css"

const TweetPage = ({ data }) => {
    const tweet = data.tweetsCsv;
    const linkedText = Autolinker.link(tweet.text, {
        mention: 'twitter',
        hashtag: 'twitter'
    });
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
    const [webMentions, setWebMentions] = useState([]);
    useEffect(() => {
        fetch(`https://webmention.io/api/mentions.jf2?target=https://trumptwitter.org/realDonaldTrump/status/${tweet.id}`)
            .then(response => response.json())
            .then(data => {
                if (data.name == "Webmentions") {
                    console.log(`Web mentions found: ${data.children.length}`)
                    setWebMentions(data.children)
                } else {
                    console.error("Cannot connect to Webmention.io: bad response");
                    setWebMentions([]);
                }
            })
            .error(error => {
                console.error("Cannot connect to Webmention.io:", error);
                setWebMentions([]);
            })
    }, [])

    return (
        <Layout>
            <SEO title={"Tweet"}/>
            <section>
                <figure class="tweet">
                    <blockquote cite={`https://twitter.com/realDonaldTrump/status/${tweet.id}`}>
                        <p dangerouslySetInnerHTML={{ __html: linkedText }}></p>
                    </blockquote>
                    <figcaption>
                        &mdash; @realDonaldTrump
                    </figcaption>
                </figure>
            </section>
            <section>
                <details open>
                    <summary>Metadata</summary>
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
                </details>
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
                <details>
                    <summary>Webmentions ({webMentions.length})</summary>
                    <p>Webmentions are like Twitter <a>@mentions</a>, but they work anywhere on the internet. When another website links to this archived tweet, it will be listed here:</p>
                    <ul>
                        {webMentions.map(mention => 
                            <li>
                               <a href={mention.url} target="_blank" rel="noopener noreferrer">{mention.url}</a>
                            </li>
                        )}
                        {webMentions.length == 0 && 
                            <li>There are no webmentions for this page.</li>
                        }
                    </ul>
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
