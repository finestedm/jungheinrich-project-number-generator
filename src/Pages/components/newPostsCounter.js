import moment from 'moment'

export default function getPostsNotOlderThan24h(posts) {
    return posts.filter(post => moment().diff(moment(post.createdAt), 'days') <= 1).length      // returns projects not older than 1 day
}