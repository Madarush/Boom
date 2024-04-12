document.getElementById('categoryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get selected categories
    var selectedCategories = [];
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(function(checkbox) {
        selectedCategories.push(checkbox.value);
    });
    
    if (selectedCategories.length > 0) {
        // Perform the search based on selected categories
        var searchQuery = selectedCategories.join('+');
        var searchUrl = 'https://www.googleapis.com/customsearch/v1?q=' + encodeURIComponent(searchQuery) + '&cx=YOUR_CSE_ID&key=YOUR_API_KEY';

        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data.items);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    } else {
        alert('Please select at least one category.');
    }
});

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
