// This function will be called when the search results are ready
function onGoogleSearchReady() {
    // Access the search results data and display it on your page
    var searchResults = google.search.cse.element.getElement('searchResults');
    if (searchResults) {
        var resultsHTML = '';
        var items = searchResults.results;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            resultsHTML += '<div>';
            resultsHTML += '<h2><a href="' + item.url + '">' + item.title + '</a></h2>';
            resultsHTML += '<p>' + item.snippet + '</p>';
            resultsHTML += '</div>';
        }
        document.getElementById('searchResults').innerHTML = resultsHTML;
    }
}
