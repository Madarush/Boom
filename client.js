document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let searchTerm = document.getElementById('searchInput').value;
    searchGoogle(searchTerm);
});

function searchGoogle(searchTerm) {
    // Make an AJAX request to the server-side Java servlet
    fetch('/search?q=' + encodeURIComponent(searchTerm))
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data.results);
        })
        .catch(error => console.error('Error searching Google:', error));
}

function displaySearchResults(results) {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result;
        resultsList.appendChild(li);
    });
}
