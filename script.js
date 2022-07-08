let myLibrary = [];

/* Book object */

function Book(title,author,year,publisher,pages) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.publisher = publisher;
  this.pages = pages;
  this.read = false;
  this.favourited = false;
}

/* Function to add book */

function addBookToLibrary(title,author,year,publisher,pages) {
  const newBook = new Book(title,author,year,publisher,pages);
  myLibrary.push(newBook);
  return;
}

/* Function to display book */

function displayBooksInLibrary() {
  removeAllCards();
  for (let i = 1; i <= myLibrary.length; i++) {
    const book = myLibrary[i - 1];
    const prototype = document.getElementById('card-prototype');
    const newBook = prototype.cloneNode(true);

    newBook.removeAttribute("id");
    newBook.classList.add("card");
    newBook.querySelector(".id-number").textContent = i;
    newBook.querySelector(".title").textContent = book.title;
    newBook.querySelector(".author>.book-data").textContent = book.author;
    newBook.querySelector(".year>.book-data").textContent = book.year;
    newBook.querySelector(".publisher>.book-data").textContent = book.publisher;
    newBook.querySelector(".pages>.book-data").textContent = book.pages;

    if (book.favourited) {
      newBook.classList.add("favourited");
      const favourite = newBook.querySelector(".favourite > img");
      favourite.src = "images/star-fav.svg";
    }

    if (book.read) {
      newBook.classList.add("read");
      const read = newBook.querySelector(".read > img");
      read.src = "images/book-open-variant.svg";
    }

    // Add event listeners to the buttons
    newBook.querySelector(".favourite").addEventListener("click",toggleFavourite);
    newBook.querySelector(".read").addEventListener("click",toggleRead);
    newBook.querySelector(".delete-button").addEventListener("click",deleteBook)
    document.querySelector(".library").appendChild(newBook);
  }

  // textFit all long text fields on card
  const allTitles = document.querySelectorAll(".card .book-data");
  allTitles.forEach(e => textFit(e));
  
  // Untoggle "show" buttons when redisplaying cards
  const toggleButtons = document.querySelectorAll('.header-buttons button');
  toggleButtons.forEach(e => {
    if (e.classList.contains("pressed")) {
      const buttonImage = e.querySelector('img');
      e.classList.remove("pressed");
      buttonImage.src = buttonImage.src.replace("-white","");
    }
  });
  return;
}

function removeAllCards() {
  const allBooks = document.querySelectorAll('.card');
  allBooks.forEach(n => n.remove());
  return;
}

/* Buttons to open and close form to add book */

const formOpen = document.getElementById('form-open');

formOpen.addEventListener('click',toggleNewBookWindow);

function toggleNewBookWindow() {
  const formAddNewBook = document.getElementById('form-add-new-book');
  if (formAddNewBook.style.display === '') openNewBookWindow();
  else closeNewBookWindow();
}

function openNewBookWindow() {
  const formAddNewBook = document.getElementById('form-add-new-book');
  formAddNewBook.style.display = 'block';
  return;
}

const formExit = document.getElementById('form-exit');

formExit.addEventListener('click',closeNewBookWindow);

function closeNewBookWindow() {
  const formAddNewBook = document.getElementById('form-add-new-book');
  formAddNewBook.style.display = '';
  return;
}

/* Button to add book details from form */

const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click',addNewBook);

function addNewBook() {
  const titleInput = document.getElementById('title-input');
  const authorInput = document.getElementById('author-input');
  const yearInput = document.getElementById('year-input');
  const publisherInput = document.getElementById('publisher-input');
  const pagesInput = document.getElementById('pages-input');

  // Validity checks

  if (!titleInput.validity.valid) {
    setError('title-input','Please enter a title');
    titleInput.addEventListener('input',() => clearError('title-input'));
  } 
  
  if (!yearInput.validity.valid) {
    setError('year-input','Please enter a number between 0 and 9999');
    yearInput.addEventListener('input',() => checkError('year-input'));
  }

  if (!pagesInput.validity.valid) {
    setError('pages-input','Please enter a number between 0 and 999999');
    pagesInput.addEventListener('input',() => checkError('pages-input'));
  }

  // If all validity checks passed, add book

  if (titleInput.validity.valid && yearInput.validity.valid && pagesInput.validity.valid) {
    addBookToLibrary(titleInput.value,authorInput.value || '-',yearInput.value || '-',publisherInput.value || '-',pagesInput.value || '-');
    displayBooksInLibrary();
    clearAllFields();
  }
  return;
}

function setError(inputID,message) {
  const selectedInput = document.getElementById(inputID);
  selectedInput.classList.add('field-error');
  selectedInput.nextElementSibling.textContent = message;
  return;
}

function clearError(inputID) {
  const selectedInput = document.getElementById(inputID);
  selectedInput.classList.remove('field-error');
  selectedInput.nextElementSibling.textContent = "";
  return;
}

// Switch to greedy checking once error is triggered

function checkError(inputID) {
  const selectedInput = document.getElementById(inputID);
  if (selectedInput.validity.valid) {
    clearError(inputID);
    selectedInput.removeEventListener('input',checkError('year-input'));
  }
  return;
}

function clearAllFields() {
  const allFields = document.querySelectorAll('form input');
  allFields.forEach(e => e.value = "");
  return;
}

/* Functions for card buttons */

function deleteBook() {
  const parentCard = this.parentElement;
  const cardNumber = parseInt(parentCard.querySelector(".id-number").textContent) - 1;
  myLibrary.splice(cardNumber,1);
  displayBooksInLibrary();
}

function toggleFavourite() {
  const favourite = this.querySelector("img");
  let parentCard = this.parentElement;
  while (!parentCard.classList.contains("card")) parentCard = parentCard.parentElement;
  const cardNumber = parseInt(parentCard.querySelector(".id-number").textContent) - 1;
  if (parentCard.classList.contains("favourited")) {
    parentCard.classList.remove("favourited");
    favourite.src = "images/star-outline.svg";
    myLibrary[cardNumber].favourited = false;
  } else {
    parentCard.classList.add("favourited");
    favourite.src = "images/star-fav.svg";
    myLibrary[cardNumber].favourited = true;
  }
  return;
}

function toggleRead() {
  const read = this.querySelector("img");
  let parentCard = this.parentElement;
  while (!parentCard.classList.contains("card")) parentCard = parentCard.parentElement;
  const cardNumber = parseInt(parentCard.querySelector(".id-number").textContent) - 1;
  if (parentCard.classList.contains("read")) {
    parentCard.classList.remove("read");
    read.src = "images/book-open-blank-variant.svg";
    myLibrary[cardNumber].read = false;
  } else {
    parentCard.classList.add("read");
    read.src = "images/book-open-variant.svg";
    myLibrary[cardNumber].read = true;
  }
  return;
}

/* Buttons to show only selected cards */

const showFavourites = document.getElementById("show-favourites");
const showUnread = document.getElementById("show-unread");

showFavourites.addEventListener("click",() => toggleShow(showFavourites,'.card:not(.favourited)','hide-favourite'));
showUnread.addEventListener("click", () => toggleShow(showUnread,'.card.read','hide-unread'));

function toggleShow(node,classSelector,hideClass) {
  const buttonImage = node.querySelector('img');
  const nonShown = document.querySelectorAll(classSelector);
  if (node.classList.contains("pressed")) {
    node.classList.remove("pressed");
    buttonImage.src = buttonImage.src.replace("-white","");
    nonShown.forEach(e => e.classList.remove(hideClass))
  } else {
    node.classList.add("pressed");
    buttonImage.src = buttonImage.src.replace(".svg","-white.svg");
    nonShown.forEach(e => e.classList.add(hideClass))
  }
  return;
}