let myLibrary = [];

function Book(title,author,year,publisher,pages,read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.publisher = publisher;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title,author,year,publisher,pages,read) {
  const newBook = new Book(title,author,year,publisher,pages,read);
  myLibrary.push(newBook);
  return;
}

function removeAllCards() {
  const allBooks = document.querySelectorAll('.card:not(#card-prototype)');
  allBooks.forEach(n => n.remove());
  return;
}

function displayBooksInLibrary() {
  removeAllCards();
  for (let i = 1; i <= myLibrary.length; i++) {
    const book = myLibrary[i - 1];
    const prototype = document.getElementById('card-prototype');
    const newBook = prototype.cloneNode(true);

    newBook.removeAttribute("id");
    newBook.setAttribute("data-book-number", i);
    newBook.querySelector(".id-number").textContent = i;
    newBook.querySelector(".title").textContent = book.title;
    newBook.querySelector(".author>.book-data").textContent = book.author;
    newBook.querySelector(".year>.book-data").textContent = book.year;
    newBook.querySelector(".publisher>.book-data").textContent = book.publisher;
    newBook.querySelector(".pages>.book-data").textContent = book.pages;
    document.querySelector(".library").appendChild(newBook);
  }

  const allTitles = document.querySelectorAll(".card:not(#card-prototype) .book-data");
  allTitles.forEach(e => textFit(e));
  return;
}

const formExit = document.getElementById('form-exit');

formExit.addEventListener('click',closeNewBookWindow);

function closeNewBookWindow() {
  const formAddNewBook = document.getElementById('form-add-new-book');
  formAddNewBook.style.display = '';
  return;
}

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

const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click',addNewBook);

function addNewBook() {
  const titleInput = document.getElementById('title-input');
  const authorInput = document.getElementById('author-input');
  const yearInput = document.getElementById('year-input');
  const publisherInput = document.getElementById('publisher-input');
  const pagesInput = document.getElementById('pages-input');

  if (!titleInput.value) {
    setError('title-input','Please enter a title');
    titleInput.addEventListener('input',() => clearError('title-input'));
  } else {
    addBookToLibrary(titleInput.value,authorInput.value || '-',yearInput.value || '-',publisherInput.value || '-',pagesInput.value || '-',false);
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

function clearAllFields() {
  const allFields = document.querySelectorAll('form input');
  allFields.forEach(e => e.value = "");
  return;
}

function testFit() {
  textFit(document.querySelector('[data-book-number="1"] .title'));
  return;
}
