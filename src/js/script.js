// Add reference to handlebars template
const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

// Add reference to book list container
const bookListContainer = document.querySelector('.books-list');

// Add an empty array for Favourite Books
const favouriteBooks = [];

// Add an empty array for Filters
const filters = [];

// Add reference to filters container
const filtersContainer = document.querySelector('.filters');

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

// Add function initActions
const initActions = function() {

  // Add double click event Listener to bookListContainer
  bookListContainer.addEventListener('dblclick', function(event) {

    // Remove default browser behaviour
    event.preventDefault();

    // Add reference to clicked element parent
    const clickedElement = event.target.offsetParent;

    // Check if clicked element is a book element
    if (clickedElement.classList.contains('book__image')) {

      // Get book data-id attribute value
      const bookId = clickedElement.getAttribute('data-id');

      // Add/remove book ID to/from favourite books
      if (!favouriteBooks.includes(bookId)) {
        favouriteBooks.push(bookId);
      } else {
        const index = favouriteBooks.indexOf(bookId);
        favouriteBooks.splice(index, 1);
      }

      // Add/remove class favorite to/from book HTML
      if (!clickedElement.classList.contains('favorite')) {
        clickedElement.classList.add('favorite');
      } else {
        clickedElement.classList.remove('favorite');
      }
  
    }

  });

  // Add click event listener to filtersContainer
  filtersContainer.addEventListener('click', function(event) {

    // Add reference to clicked element
    const clickedElement = event.target;

    // Add reference to clicked element tagName, Type && Name
    const tag = clickedElement.tagName;
    const type = clickedElement.getAttribute('type');
    const name = clickedElement.getAttribute('name');
    
    // Check if clicked element is input type checkbox with name filter
    if (tag == 'INPUT' && type == 'checkbox' && name == 'filter') {
      
      // Check if input is checked
      if (clickedElement.checked) {

        // Add input value to filters array
        filters.push(clickedElement.value);

      } else {

        // Remove input value from filters array
        const index = filters.indexOf(clickedElement.value);
        filters.splice(index, 1);

      }

    }

  });

};

// Run render function
render();

// Run initActions function
initActions();



