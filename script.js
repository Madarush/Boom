// Function to execute when Google Sign-In is successful
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var login = document.getElementById('login');
    var home = document.getElementById('home');
    
    login.style.display = 'none';
    home.style.display = 'block';
    
    // Implement sign-out if needed
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //     console.log('User signed out.');
    // });
}

// Load Google CSE
function onLoad() {
    var searchBox = new google.search.customsearchcontrol.SearchControl('YOUR_CSE_ID');
    searchBox.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);
    searchBox.draw('searchResults');
}

// Execute onLoad when page loads
google.setOnLoadCallback(onLoad);

// Function to perform search
function searchGames() {
    var query = document.getElementById('searchBar').value;
    var category = document.getElementById('categoryDropdown').value;
    var search = category === 'all' ? query : query + ' ' + category;
    google.search.cse.element.getElement('searchResults').execute(search);
}

// Execute search when user types in search bar
document.getElementById('searchBar').addEventListener('input', searchGames);
document.getElementById('categoryDropdown').addEventListener('change', searchGames);
