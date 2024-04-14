// Function to toggle dark mode
function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
}

// Function to handle dark mode toggle button click
function handleDarkModeToggle() {
    var darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("click", function() {
        toggleDarkMode();
    });
}

// Function to handle navigation between pages
function navigateTo(page) {
    window.location.href = page + ".html";
}

// Function to handle search button click
function searchGames() {
    var searchInput = document.getElementById("searchInput").value;
    var cx = "5017b877e073141e6"; // Google Custom Search Engine ID
    var apiKey = "AIzaSyCtsWWwmH3TW_nNyuWHwoNaEUL6lTfoGvc"; // Google Custom Search API Key
    var url = "https://www.googleapis.com/customsearch/v1?key=" + apiKey + "&cx=" + cx + "&q=" + searchInput + "&searchType=image";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var items = data.items;
            var resultsContainer = document.getElementById("resultsContainer");
            resultsContainer.innerHTML = "";

            items.forEach(item => {
                var result = document.createElement("div");
                result.classList.add("result");

                var title = document.createElement("h3");
                title.textContent = item.title;

                var link = document.createElement("a");
                link.href = item.link;
                link.target = "_blank";
                var img = document.createElement("img");
                img.src = item.image.thumbnailLink;
                img.alt = item.title;
                link.appendChild(img);

                var snippet = document.createElement("p");
                snippet.textContent = item.snippet;

                result.appendChild(title);
                result.appendChild(link);
                result.appendChild(snippet);

                resultsContainer.appendChild(result);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

// Call the handleDarkModeToggle function when the page is loaded
window.onload = function() {
    handleDarkModeToggle();
};
