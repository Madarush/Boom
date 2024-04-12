// Function to perform search
function searchGames() {
    var query = document.getElementById('searchBar').value;
    var category = document.getElementById('categoryDropdown').value;
    var search = category === 'all' ? query : query + ' ' + category;

    // Replace 'YOUR_API_KEY' and 'YOUR_CX' with your actual Google CSE API key and Custom Search Engine ID
    var apiKey = 'YOUR_API_KEY';
    var cx = 'YOUR_CX';
    var url = 'https://www.googleapis.com/customsearch/v1?key=' + apiKey + '&cx=' + cx + '&q=' + encodeURIComponent(search);

    // Clear previous search results
    document.getElementById('searchResults').innerHTML = '';

    // Fetch search results from Google Custom Search JSON API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items) {
                data.items.forEach(item => {
                    var title = item.title;
                    var link = item.link;
                    var snippet = item.snippet;

                    var gameElement = document.createElement('div');
                    gameElement.classList.add('game');

                    var titleElement = document.createElement('div');
                    titleElement.classList.add('title');
                    titleElement.textContent = title;

                    var snippetElement = document.createElement('div');
                    snippetElement.classList.add('snippet');
                    snippetElement.textContent = snippet;

                    var linkElement = document.createElement('a');
                    linkElement.href = link;
                    linkElement.target = '_blank';
                    linkElement.textContent = 'View Game';

                    gameElement.appendChild(titleElement);
                    gameElement.appendChild(snippetElement);
                    gameElement.appendChild(linkElement);

                    document.getElementById('searchResults').appendChild(gameElement);
                });
            } else {
                document.getElementById('searchResults').textContent = 'No results found.';
            }
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
            document.getElementById('searchResults').textContent = 'An error occurred while fetching search results.';
        });
}

// Execute search when user clicks search button
document.getElementById('searchButton').addEventListener('click', searchGames);
