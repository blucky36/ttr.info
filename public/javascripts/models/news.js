/**
 * title: string
 * postId: number
 * author: string
 * body: html string
 * date: timestamp string
 * image: href string
 */
class LatestNews {
    /**
     * Number.
     */
    postId;
    /**
     * Title of the article.
     * {string}
     */
    title;
    /**
     * Author of the article.
     * {string}
     */
    author;
    /**
     * Html Body of the article.
     * {string}
     */
    body;
    /**
     * Date of the article.
     * {string}
     */
    date;
    /**
     * Image href associated with the article;
     * {string}
     */
    image;

    constructor({ data }) {
        data && Object.assign(this, data)
    }
}

module.exports = { LatestNews };