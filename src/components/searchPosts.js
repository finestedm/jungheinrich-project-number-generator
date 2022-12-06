export default function searchPosts(posts, searchedPhrase) {
	let foundPosts = []
	searchedPhrase = searchedPhrase.toString().toLowerCase();
	const searchedPhraseSplitIntoWords = searchedPhrase.trim().split(/\s+/);
	posts.forEach(post => {
		const postInSingleString = (Object.values(post)).join(' ').toLowerCase();
		searchedPhraseSplitIntoWords.every(word => postInSingleString.includes(word)) && foundPosts.push(post)
	})

	
    return foundPosts
}

