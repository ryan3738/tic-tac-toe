const myLibrary = [
  { title: 'The Hobbit', author: 'Tolkien', pages: 254, read: true },
  { title: 'The Hobbit', author: 'Tolkien', pages: 254, read: true },
  { title: 'The Hobbit', author: 'Tolkien', pages: 254, read: true },
]

// 1. Make event listener for button to show modal for new book info
// Get the modal
const modal = document.getElementById('newBookModal')

// Get the button that opens the modal
const btn = document.getElementById('addBookButton')

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0]

// When the user clicks on the button, open the modal
btn.onclick = function () {
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

// 2.1 Allow user to submit book info in modal
// 2.2 Hide modal after user submits new book

// 3. On myLibrary change update books that are displayed
// 4. Allow user to change read status of books on button press
// 5. Allow user to delete book from library on button press
// 6. Store users library in local storage

function Book() {
  // the constructor...
  this.title = title
  this.author = author
  this.pages = pages
  this.haveRead = haveRead
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${haveRead}`
  }
}

// Function that loops through the array and displays each book on the page.
function addBookToLibrary() {
  // do stuff here
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet')
