// Add reference to handlebars template
const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

// Add reference to book list container
const bookListContainer = document.querySelector('.books-list');

// Add function render
const render = function() {

  // Iterate through dataSource.books array
  for (const book of dataSource.books) {

    // Generate HTML based on template and book data
    const generatedHTML = template(book);

    // Generate DOM element based on given HTML
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);

    bookListContainer.appendChild(generatedDOM);
  }
};

// Run render function
render();

// Add empty array for favourite books
const favouriteBooks = [];

// Add reference to all books on page
const allBooks = document.querySelectorAll('.book__image');

const initActions = function() {

  // Iterate through every book on page
  for (const book of allBooks) {

    const bookId = book.getAttribute('data-id');

    // Add double click event Listener to book
    book.addEventListener('dblclick', function(event) {
      event.preventDefault();

      // Add book ID to favourite books
      if (!favouriteBooks.includes(bookId)) {
        favouriteBooks.push(bookId);
      }

      // Add class favorite to book HTML
      if (!book.classList.contains('favorite')) {
        book.classList.add('favorite');
      }

    });

  }

};

// Run initActions function
initActions();