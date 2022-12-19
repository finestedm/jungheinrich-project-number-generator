import * as JsSearch from 'js-search';

export default function searchPosts(posts, filters) {

	// first we have to implement smart method to search through the filters and apply them. Only status and user will probably be filtered for now

	// const postsFiltered = posts.filter(post => post.status === filters.status[0])

	if (filters.searchedPhrase === null) {   // filters.status.length === 0
		// return postsFiltered
		return posts
	} else {

		var search = new JsSearch.Search('_id');
		search.addIndex('customer');
		search.addIndex('location');
		search.addIndex('description')
	
		// search.addDocuments(postsFiltered);
		search.addDocuments(posts);
	
		if ((filters.searchedPhrase.charAt(0) === '"') && (filters.searchedPhrase.slice(-1) === '"')) {
			// JsSearch.ExactWordIndexStrategy()	
			return search.search(filters.searchedPhrase.slice(1, -1))
		} else {
			JsSearch.PrefixIndexStrategy()
			return search.search(filters.searchedPhrase)
		}
	}
}