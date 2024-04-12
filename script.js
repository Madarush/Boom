function search() {
    var searchTerm = document.getElementById('searchInput').value;
    if (searchTerm.trim() !== '') {
        var apiKey = 'AIzaSyCtsWWwmH3TW_nNyuWHwoNaEUL6lTfoGvc';
        var cseId = '5017b877e073141e6';
        var searchUrl = 'https://www.googleapis.com/customsearch/v1?q=' + encodeURIComponent(searchTerm) + '&cx=' + cseId + '&key=' + apiKey;
        
        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data.items);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    } else {
        alert('Please enter a search term.');
    }
}

function displaySearchResults(results) {
    var resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    if (results && results.length > 0) {
        results.forEach((result, index) => {
            var li = document.createElement('li');
            var link = document.createElement('a');
            link.href = result.link;
            link.textContent = result.title;
            li.appendChild(link);
            resultsList.appendChild(li);
        });
    } else {
        var li = document.createElement('li');
        li.textContent = 'No results found.';
        resultsList.appendChild(li);
    }
}
