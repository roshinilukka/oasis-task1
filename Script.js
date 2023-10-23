// script.js
function searchBooks() {
    const searchQuery = document.getElementById('search-input').value;

    // Check if the search query is not empty
    if (searchQuery.trim() !== '') {
        const apiUrl = `https://openlibrary.org/search.json?q=${searchQuery}`;

        // Fetch data from the Open Library API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Display search results
                displaySearchResults(data.docs);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}

function displaySearchResults(books) {
    const resultsContainer = document.getElementById('search-results');

    // Clear previous search results
    resultsContainer.innerHTML = '';

    // Display each book in the search results
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book';

        // Display book cover if available
        if (book.cover_i) {
            const coverImg = document.createElement('img');
            coverImg.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
            coverImg.alt = `${book.title} Cover`;
            bookElement.appendChild(coverImg);
        }

        // Display book title and author
        const infoElement = document.createElement('div');
        infoElement.className = 'book-info';
        infoElement.innerHTML = `<h2>${book.title}</h2><p>${book.author_name ? book.author_name.join(', ') : 'Author Unknown'}</p>`;
        bookElement.appendChild(infoElement);

        resultsContainer.appendChild(bookElement);
    });
}
