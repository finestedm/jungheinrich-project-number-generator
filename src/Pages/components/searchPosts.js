export default function searchPosts(posts, searchedPhrase) {
    let foundPosts = []
    posts.forEach(post => (Object.values(post)).forEach(value => {
        if (isNaN(value)) {                                                                         // toLowerCase doesn't work with number so we have to check for NaN, then check if the lowerCased stuff contains searchedPhrase
            value.toLowerCase().includes(searchedPhrase.toLowerCase()) && foundPosts.push(post);
        } else {
            if (value === parseInt(searchedPhrase)) {                                                  // cannot use include as it does not work with number.
                foundPosts.push(post)
            }
        }
    })) 
    return foundPosts
}