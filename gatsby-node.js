const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions}) => {
    const { createPage } = actions;
    const result = await graphql(`
        query {
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

    result.data.allTweetsCsv.edges.forEach(({ node }) => {
        const data = {
            id: node.id,
            date: node.date,
            isDeleted: node.isDeleted,
            isFlagged: node.isFlagged,
            isRetweet: node.isRetweet,
            device: node.device,
            favorites: node.favorites,
            retweets: node.retweets,
            text: node.text
        }
        createPage({
            path: `realDonaldTrump/status/${node.id}`,
            component: path.resolve(`./src/components/tweet.js`),
            context: data
        })
        createPage({
            path: `realDonaldTrump/status/${node.id}/embed.html`,
            component: path.resolve(`./src/components/tweet.js`),
            context: data
        })
    });
}