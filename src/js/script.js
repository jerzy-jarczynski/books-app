class BooksList {
  constructor() {
    const thisBooksList = this;

    thisBooksList.favoriteBooks = [];
    thisBooksList.filters = [];

    thisBooksList.initData();
    thisBooksList.getElements();
    thisBooksList.render();
    thisBooksList.initActions();
  }

  render() {
    const thisBooksList = this;

    for (const book of thisBooksList.data) {

      book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;

      const generatedHTML = thisBooksList.template(book);

      const generatedDOM = utils.createDOMFromHTML(generatedHTML);

      thisBooksList.dom.bookListContainer.appendChild(generatedDOM);

    }

    thisBooksList.dom.bookImages = thisBooksList.dom.bookListContainer.querySelectorAll('.book__image');
    console.log(thisBooksList.dom.bookImages);
  }

  initData() {
    const thisBooksList = this;

    thisBooksList.data = dataSource.books;
  }

  getElements() {
    const thisBooksList = this;

    thisBooksList.dom = {};

    thisBooksList.dom.bookListContainer = document.querySelector('.books-list');
    thisBooksList.dom.filtersContainer = document.querySelector('.filters');
    thisBooksList.template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  }

  initActions() {
    const thisBooksList = this;

    thisBooksList.dom.bookListContainer.addEventListener('dblclick', function(event) {
      event.preventDefault();

      const clickedElement = event.target.offsetParent;

      if (clickedElement.classList.contains('book__image')) {
        const bookId = clickedElement.getAttribute('data-id');

        if (!thisBooksList.favoriteBooks.includes(bookId)) {
          thisBooksList.favoriteBooks.push(bookId);
        } else {
          const index = thisBooksList.favoriteBooks.indexOf(bookId);
          thisBooksList.favoriteBooks.splice(index, 1);
        }

        if (!clickedElement.classList.contains('favorite')) {
          clickedElement.classList.add('favorite');
        } else {
          clickedElement.classList.remove('favorite');
        }
      }
    });

    thisBooksList.dom.filtersContainer.addEventListener('click', function(event) {
      const clickedElement = event.target;

      const tag = clickedElement.tagName;
      const type = clickedElement.getAttribute('type');
      const name = clickedElement.getAttribute('name');

      if (tag == 'INPUT' && type == 'checkbox' && name == 'filter') {

        if (clickedElement.checked) {
          thisBooksList.filters.push(clickedElement.value);
          thisBooksList.filterBooks();
        } else {
          const index = thisBooksList.filters.indexOf(clickedElement.value);
          thisBooksList.filters.splice(index, 1);
          thisBooksList.filterBooks();
        }

      }
    });
  }

  filterBooks() {
    const thisBooksList = this;

    for (const book of thisBooksList.data) {
      let shouldBeHidden = false;

      for (const filter of thisBooksList.filters) {

        if (!book.details[filter]) {

          shouldBeHidden = true;
          break;

        }

      }

      if (shouldBeHidden) {

        for (const bookImg of thisBooksList.dom.bookImages) {

          if (book.id == bookImg.getAttribute('data-id')) {

            bookImg.classList.add('hidden');

          }

        }

      } else {

        for (const bookImg of thisBooksList.dom.bookImages) {

          if (book.id == bookImg.getAttribute('data-id')) {

            bookImg.classList.remove('hidden');

          }

        }

      }
    }
  }

  determineRatingBgc(rating) {

    let backgroundGradient;

    if (rating <= 6) {

      backgroundGradient = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
  
    } else if (rating > 6 && rating <= 8) {
  
      backgroundGradient = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
  
    } else if (rating > 8 && rating <= 9) {
  
      backgroundGradient = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
  
    } else if (rating > 9) {
  
      backgroundGradient = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
  
    }
  
    return backgroundGradient;

  }

}

const app = new BooksList();

console.log(app);

