/**
 * title: string
 * postId: number
 * author: string
 * body: html string
 * date: timestamp string
 * image: href string
 */
export class LatestNews {
    /**
     * Number.
     */
    postId: string;
    /**
     * Title of the article.
     * {string}
     */
    title: string;
    /**
     * Author of the article.
     * {string}
     */
    author: string;
    /**
     * Html Body of the article.
     * {string}
     */
    body: string;
    /**
     * Date of the article.
     * {string}
     */
    date: string;
    /**
     * Image href associated with the article;
     * {string}
     */
    image: string;

    constructor({ data }) {
        data && Object.assign(this, data)
    }
}
