document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var searchTerm = document.getElementById('searchInput').value.trim();
    
    if (searchTerm !== '') {
        // Perform the search
        var searchUrl = 'https://www.googleapis.com/customsearch/v1?q=' + encodeURIComponent(searchTerm) + '&cx=5017b877e073141e6&key=AIzaSyCtsWWwmH3TW_nNyuWHwoNaEUL6lTfoGvc';

        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data.items);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    } else {
        alert('Please enter a search query.');
    }
});

function displaySearchResults(results) {
    var resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    if (results && results.length > 0) {
        results.forEach(result => {
            var li = document.createElement('li');
            var link = document.createElement('a');
            link.href = result.link;
            link.textContent = result.title;
            li.appendChild(link);
            
            // Check if the result has a thumbnail image
            if (result.pagemap && result.pagemap.cse_thumbnail && result.pagemap.cse_thumbnail.length > 0) {
                var thumbnailUrl = result.pagemap.cse_thumbnail[0].src;
                var img = document.createElement('img');
                img.src = thumbnailUrl;
                img.alt = result.title;
                li.appendChild(img);
            }
            
            resultsList.appendChild(li);
        });
    } else {
        var li = document.createElement('li');
        li.textContent = 'No results found.';
        resultsList.appendChild(li);
    }
}
