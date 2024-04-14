// Function to perform a search using Google CSE
function performSearch(query) {
    var cx = '5017b877e073141e6'; // Replace 'YOUR_SEARCH_ENGINE_ID' with your actual CSE ID
    var apiKey = 'AIzaSyCtsWWwmH3TW_nNyuWHwoNaEUL6lTfoGvc'; // Replace 'YOUR_API_KEY' with your actual API key

    // Make sure the query is not empty
    if (query.trim() !== '') {
        // Construct the search URL
        var url = 'https://www.googleapis.com/customsearch/v1?q=' + query + '&cx=' + cx + '&key=' + apiKey;

        // Fetch search results from the API
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Display the search results
                displaySearchResults(data.items);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    }
}

// Function to display search results on the webpage
function displaySearchResults(results) {
    var searchResultsDiv = document.getElementById('searchResults');

    // Clear previous search results
    searchResultsDiv.innerHTML = '';

    if (results && results.length > 0) {
        results.forEach(item => {
            var resultDiv = document.createElement('div');
            resultDiv.classList.add('result');

            var title = document.createElement('a');
            title.href = item.link;
            title.textContent = item.title;
            title.target = '_blank';
            resultDiv.appendChild(title);

            var snippet = document.createElement('p');
            snippet.textContent = item.snippet;
            resultDiv.appendChild(snippet);

            // Check if image is available
            if (item.pagemap && item.pagemap.cse_image && item.pagemap.cse_image.length > 0) {
                var image = document.createElement('img');
                image.src = item.pagemap.cse_image[0].src;
                image.alt = "Image for " + item.title; // Alt text for accessibility
                image.classList.add('search-result-image'); // Add a class for styling
                resultDiv.appendChild(image);
            } else {
                var noImage = document.createElement('p');
                noImage.textContent = "No image available";
                resultDiv.appendChild(noImage);
            }

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

// Event listener for dark mode toggle switch
document.getElementById('darkModeToggle').addEventListener('change', function() {
    toggleDarkMode();
});

// Function to toggle between dark and light mode
function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
}
