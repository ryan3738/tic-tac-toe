const container = document.querySelector('#container')

// Get the modal
const modal = document.getElementById('newBookModal')

// Get the button that opens the modal
const addBookButton = document.getElementById('addBookButton')

// Get the <span> element that closes the modal
const span = document.getElementById('closeModal')
const submitNewBookButton = document.getElementById('submitNewBookButton')

const myLibrary = [
  { id: 0, title: 'The Hobbit', author: 'Tolkien', pages: 254, haveRead: true },
  {
    id: 1,
    title: 'Lord of The Rings: Return of the King',
    author: 'Tolkien',
    pages: 254,
    haveRead: true,
  },
  {
    id: 2,
    title: 'The Hobbit',
    author: 'Tolkien',
    pages: 254,
    haveRead: false,
  },
]

function getId() {
  // Create function that checks if id exists and assigns next availabe value
}

function addSomeBooks() {
  // Create function to populate some books for testing
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
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${haveRead}`
  }
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

    removeBookButton.innerHTML = 'X'
    removeBookButton.title = 'Remove Book'
    removeBookButton.id = 'deleteBookButton'
    removeBookButton.addEventListener('click', removeBook)

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

// 4. Allow user to change read status of books on button press
function toggleHaveRead() {
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
  displayBooks()
}

// 5. Allow user to delete book from library on button press
function removeBook() {
  const bookCardId = parseInt(this.parentElement.id)
  const index = myLibrary.findIndex((book) => book.id === bookCardId)
  console.log('index...', index)
  myLibrary.splice(index, 1)
  displayBooks()
}

// 6. Store users library in local storage

// Run displayBook function on window load
// window.onload = displayBook
displayBooks()

function addBookToLibrary(form) {
  // do stuff here
  const id = myLibrary.length
  let bookObject = new Book(id)
  for (const eachInput of form) {
    let { name, value, type } = eachInput
    if (type === 'number') {
      value = parseInt(value)
    }
    if (type === 'checkbox') {
      value = eachInput.checked
    }
    if (value !== undefined && type !== 'submit' && type !== 'fieldset') {
      bookObject = {
        ...bookObject,
        [name]: value,
      }
    }
  }
  myLibrary.push(bookObject)
  console.log(myLibrary)
  displayBooks()
}

// 2.1 Allow user to submit book info in modal
// 2.2 Hide modal after user submits new book?
submitNewBookButton.onclick = function (event) {
  event.preventDefault()
  const { form } = event.target
  addBookToLibrary(form)
}

// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet')
