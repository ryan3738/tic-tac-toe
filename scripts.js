const container = document.querySelector('#container')

// Get the modal
const modal = document.getElementById('newBookModal')

// Get the button that opens the modal
const addBookButton = document.getElementById('addBookButton')
const newBookForm = document.getElementById('newBookForm')

// Get the <span> element that closes the modal
const span = document.getElementById('closeModal')
const submitNewBookButton = document.getElementById('submitNewBookButton')

const myLibrary = []

function getRandomInt(minParam, maxParam) {
  const min = Math.ceil(minParam)
  const max = Math.floor(maxParam)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

console.log('newBookForm', newBookForm)

const starterLibrary = [
  {
    id: 0,
    title: 'The Hobbit',
    author: 'Tolkien',
    pages: 310,
    haveRead: true,
  },
  {
    id: 1,
    title: 'Lord of The Rings: Return of the King',
    author: 'Tolkien',
    pages: 416,
    haveRead: true,
  },
  {
    id: 2,
    title: 'A Game of Thrones',
    author: 'George R. R. Martin',
    pages: 694,
    haveRead: false,
  },
]

// console.log(localStorage.getItem('myLibrary').length);

// myLibrary.push(JSON.parse(initializeLibrary()))

// localStorage.setItem('myLibrary', JSON.stringify(myLibrary))

function getId() {
  // Create function that checks if id exists and assigns next availabe value
  const arr = myLibrary
  let id = 0
  while (arr.some((el) => el.id === id)) {
    id += 1
  }
  return id
}

// 1. Make event listener for button to show modal for new book info

// When the user clicks on the button, open the modal
addBookButton.onclick = function () {
  modal.style.display = 'block'
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none'
  }
}

// Book constructor function
function Book(id, title, author, pages, haveRead) {
  // the constructor...
  this.id = id
  this.title = title
  this.author = author
  this.pages = pages
  this.haveRead = haveRead
}

function putBooksAway() {
  console.log('Cleaning up old books...')
  const oldBooks = container.querySelectorAll('div')
  oldBooks.forEach((book) => {
    if (book.id !== 'notBook') {
      book.remove()
    }
  })
  console.log('Bye bye old books...')
}

// Function that loops through the array and displays each book on the page.
// 3. On myLibrary change update books that are displayed
function displayBooks() {
  // Clean up old books from display before displaying library
  putBooksAway()
  // Cycle through books in library and create a card for each book
  for (const eachBook of myLibrary) {
    const bookCard = document.createElement('div')
    const bookTitle = document.createElement('h2')
    const bookAuthor = document.createElement('p')
    const bookPages = document.createElement('p')
    const toggleReadButton = document.createElement('button')
    const removeBookButton = document.createElement('button')

    // Toggle read button
    toggleReadButton.id = 'readButton'
    toggleReadButton.title = 'Read'
    toggleReadButton.innerHTML = 'Read'
    toggleReadButton.addEventListener('click', toggleHaveRead)
    if (eachBook.haveRead) {
      toggleReadButton.className = 'haveRead'
    }
    if (!eachBook.haveRead) {
      toggleReadButton.className = 'haveNotRead'
    }

    // Remove book button
    removeBookButton.innerHTML = 'X'
    removeBookButton.title = 'Remove Book'
    removeBookButton.id = 'deleteBookButton'
    removeBookButton.addEventListener('click', removeBook)

    // Make the book card
    bookCard.className = 'bookCard'
    bookCard.id = eachBook.id
    bookTitle.innerHTML = eachBook.title
    bookCard.appendChild(bookTitle)
    bookAuthor.innerHTML = eachBook.author
    bookCard.appendChild(bookAuthor)
    bookPages.innerHTML = eachBook.pages
    bookCard.appendChild(bookPages)
    bookCard.appendChild(toggleReadButton)
    bookCard.appendChild(removeBookButton)
    container.insertBefore(bookCard, container.childNodes[0])
  }
}

// Book.prototype.sayName = function () {
//   console.log(this.title)
// }

// Function to update library when adding books
const updateLibrary = function (bookObject) {
  myLibrary.push(bookObject)
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
  console.log(myLibrary)
  displayBooks()
}

function addSomeBooks() {
  // Create function to populate some books for testing
  for (const book of starterLibrary) {
    const starterBook = new Book(
      book.id,
      book.title,
      book.author,
      book.pages,
      book.haveRead
    )
    updateLibrary(starterBook)
  }
}

// 4. Allow user to change read status of books on button press
const toggleHaveRead = function () {
  // Toggle read status of current book
  const bookCardId = parseInt(this.parentElement.id)
  const index = myLibrary.findIndex((book) => book.id === bookCardId)
  console.log('index...', index)
  const currentStatus = myLibrary[index].haveRead
  console.log(currentStatus)
  myLibrary[index] = {
    ...myLibrary[index],
    haveRead: !currentStatus,
  }
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
  displayBooks()
}

// 5. Allow user to delete book from library on button press
function removeBook() {
  const bookCardId = parseInt(this.parentElement.id)
  const index = myLibrary.findIndex((book) => book.id === bookCardId)
  console.log('index:', index)
  myLibrary.splice(index, 1)
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
  displayBooks()
}

// 6. Store users library in local storage
// Run displayBook function on window load
// window.onload = displayBook
// displayBooks()

function formToObject(form) {
  const bookObject = {}
  console.log(bookObject)
  for (const eachInput of form) {
    let { name, value, type } = eachInput
    if (type === 'number') {
      value = parseInt(value)
    }
    if (type === 'checkbox') {
      value = eachInput.checked
    }
    if (value !== undefined && type !== 'submit' && type !== 'fieldset') {
      bookObject[name] = value
    }
  }
  return bookObject
}

function addBookToLibrary(form) {
  // do stuff here
  const id = getId()
  const formObject = formToObject(form)
  const bookObject = new Book(
    id,
    formObject.title,
    formObject.author,
    formObject.pages,
    formObject.haveRead
  )
  updateLibrary(bookObject)
}

function randomizeForm() {
  const randomBook = starterLibrary[getRandomInt(0, starterLibrary.length)]
  for (const each of newBookForm) {
    each.value = randomBook[each.name]
  }
}

// 2.1 Allow user to submit book info in modal
// 2.2 Hide modal after user submits new book?
submitNewBookButton.onclick = function (event) {
  event.preventDefault()
  const { form } = event.target
  addBookToLibrary(form)
  randomizeForm()
}

function initializeLibrary() {
  if (!localStorage.getItem('myLibrary')) {
    // Remove later once starter library is not needed.
    return addSomeBooks()
  }
  if (localStorage.getItem('myLibrary')) {
    return myLibrary.push(...JSON.parse(localStorage.getItem('myLibrary')))
  }
}

console.log('localStorage', JSON.parse(localStorage.getItem('myLibrary')))

initializeLibrary()
displayBooks()
