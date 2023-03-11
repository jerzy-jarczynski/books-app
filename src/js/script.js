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

render();