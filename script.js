function searchGames() {
    var searchInput = document.getElementById("searchInput").value;
    var cx = "YOUR_CSE_ID"; // Replace with your Google Custom Search Engine ID
    var apiKey = "YOUR_API_KEY"; // Replace with your Google Custom Search API Key
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
