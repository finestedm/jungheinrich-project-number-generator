import * as JsSearch from 'js-search';

export default function searchPosts(posts, filters) {

	// first we have to implement smart method to search through the filters and apply them. Only status and user will probably be filtered for now

	// const postsFiltered = posts.filter(post => post.status === filters.status[0])

	const activeStatuses = Object.keys(filters.status).filter(status => filters.status[status] === true)
	let activePosts = posts.filter(post => post.status !== undefined)
	activePosts = activePosts.filter(post => activeStatuses.includes((post.status).toString()))

	if (!filters.searchedPhrase) {  
		return activePosts
	} else {
		console.log(filters.searchedPhrase, activePosts)
		var search = new JsSearch.Search('_id');
		search.addIndex('customer');
		search.addIndex('location');
		search.addIndex('description')
	
		// search.addDocuments(postsFiltered);
		search.addDocuments(activePosts);

		JsSearch.PrefixIndexStrategy()
		return search.search(filters.searchedPhrase)
		
	}
}