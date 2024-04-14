// Google CSE Configuration
var searchEngineID = '5017b877e073141e6'; // Your Search Engine ID
var apiKey = 'AIzaSyCtsWWwmH3TW_nNyuWHwoNaEUL6lTfoGvc'; // Your API key

// Function to perform search using Google CSE
function performSearch(query) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.googleapis.com/customsearch/v1?key=' + apiKey + '&cx=' + searchEngineID + '&q=' + query);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            displaySearchResults(data.items);
        } else {
            console.error('Failed to fetch search results. Error code:', xhr.status);
        }
    };
    xhr.send();
}

// Function to display search results on the page
function displaySearchResults(results) {
    var searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = '';

    if (results && results.length > 0) {
        results.forEach(function(result) {
            var resultDiv = document.createElement('div');
            var title = document.createElement('h2');
            title.innerHTML = '<a href="' + result.link + '">' + result.title + '</a>';
            var snippet = document.createElement('p');
            snippet.textContent = result.snippet;
            resultDiv.appendChild(title);
            resultDiv.appendChild(snippet);
            searchResultsDiv.appendChild(resultDiv);
        });
    } else {
        searchResultsDiv.innerHTML = '<p>No results found.</p>';
    }
}

// Event listener for search button click
document.getElementById('searchBtn').addEventListener('click', function() {
    var query = document.getElementById('searchInput').value.trim();
    if (query !== '') {
        performSearch(query);
    }
});
