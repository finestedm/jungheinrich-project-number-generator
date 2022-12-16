import * as JsSearch from 'js-search';

export default function searchPosts(posts, searchedPhrase) {
	
	var search = new JsSearch.Search('_id');
	search.addIndex('customer');
	search.addIndex('location');
	search.addIndex('description')
	
	search.addDocuments(posts);
	
	if ((searchedPhrase.charAt(0) === '"') && (searchedPhrase.slice(-1) === '"')) {
		// JsSearch.ExactWordIndexStrategy()	
		return search.search(searchedPhrase.slice(1, -1))
	} else {
		JsSearch.PrefixIndexStrategy()
		return search.search(searchedPhrase)
	}
}