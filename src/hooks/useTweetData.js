import { graphql, useStaticQuery } from 'gatsby';

function useTweetData() {  
    const tweetData = useStaticQuery(graphql`
        query TweetsQuery {
            allTweetsCsv {
                edges {
                    node {
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
            }
        }
    `);
    return tweetData.allTweetsCsv.edges;
}

export default useTweetData;