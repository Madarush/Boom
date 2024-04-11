document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let searchTerm = document.getElementById('searchInput').value;
    searchGoogle(searchTerm);
});

function searchGoogle(searchTerm) {
    const apiKey = 'YOUR_API_KEY';
    const cseId = 'YOUR_CSE_ID';
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cseId}&q=${encodeURIComponent(searchTerm)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data.items);
        })
        .catch(error => console.error('Error searching Google:', error));
}

function displaySearchResults(results) {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    results.forEach(item => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = item.title;
        li.appendChild(link);
        resultsList.appendChild(li);
    });
}
