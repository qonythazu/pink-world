document.addEventListener("DOMContentLoaded", function () {
 
    const submitForm = document.getElementById("inputBook");
 
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});
  
document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});

const BOOK_ITEMID = "bookId";

function makeBookList(book, author, year, isCompleted) {
    const bookTitle = document.createElement("h3");
    bookTitle.innerText = book;
 
    const bookAuthor = document.createElement("h5");
    bookAuthor.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.innerText = year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(bookTitle, bookAuthor, bookYear);

    const button = document.createElement("div");
    button.classList.add("action");

    if(isCompleted) {
        button.append(createDeleteButton(), createBelumDibacaButton()); 
    } else {
        button.append(createDeleteButton(), createSudahDibacaButton());
    }

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(textContainer, button);

    return container;
}

function createButton(buttonText, buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.innerText = buttonText;
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function createDeleteButton() {
    return createButton("Hapus Buku", "red", function(event){
        const answer = confirm("Yakin ingin dihapus?");
        if(answer) {
            removeBook(event.target.parentElement.parentElement);
        }
    });
}

function createBelumDibacaButton() {
    return createButton("Belum Dibaca", "green", function(event){
        undoBookFromCompleted(event.target.parentElement.parentElement);
    });
}

function createSudahDibacaButton() {
    return createButton("Sudah Dibaca", "green", function(event){
        addBookToCompleted(event.target.parentElement.parentElement);
    });
}

function removeBook(taskElement) {

    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    taskElement.remove();

    updateDataToStorage();
}

function addBook() {
    const incompleteBook = document.getElementById("incompleteBookshelfList");
    const completeBook = document.getElementById("completeBookshelfList");

    const book = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;

    if(checkbox.checked) {
        const makebook = makeBookList(book, author, year, true);
        const bookObject = composeBookObject(book, author, year, true);
  
        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
        completeBook.append(makebook);

        updateDataToStorage();
    } else {
        const makebook = makeBookList(book, author, year, false);
        const bookObject = composeBookObject(book, author, year, false);
  
        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
        incompleteBook.append(makebook);

        updateDataToStorage();
    }
}

const checkbox = document.getElementById("inputBookIsComplete");
    let check = false;
    checkbox.addEventListener("change", function(){
        if(checkbox.checked == true){
            document.querySelector("span").innerText = "Selesai dibaca"
        }else {
            document.querySelector("span").innerText = "Belum selesai dibaca"
        }
    })

function undoBookFromCompleted(taskElement){
    const listUncompleted = document.getElementById("incompleteBookshelfList");
    const book = taskElement.querySelector(".inner > h3").innerText;
    const author = taskElement.querySelector(".inner > h5").innerText;
    const year = taskElement.querySelector(".inner > p").innerText;

    const newBook = makeBookList(book, author, year, false);
    const boook = findBook(taskElement[BOOK_ITEMID]);
    boook.isCompleted = false;
    newBook[BOOK_ITEMID] = boook.id;
    

    listUncompleted.append(newBook);
    taskElement.remove();

    console.log()
    updateDataToStorage();
}

function addBookToCompleted(taskElement) {
    const listCompleted = document.getElementById("completeBookshelfList");
    const book = taskElement.querySelector(".inner > h3").innerText;
    const author = taskElement.querySelector(".inner > h5").innerText;
    const year = taskElement.querySelector(".inner > p").innerText;

    const newBook = makeBookList(book, author, year, true);
    const boook = findBook(taskElement[BOOK_ITEMID]);
    boook.isCompleted = true;
    newBook[BOOK_ITEMID] = boook.id;

    listCompleted.append(newBook);
    taskElement.remove();

    console.log();
    updateDataToStorage();
}

let filterInput = document.getElementById("searchBookTitle");
filterInput.addEventListener('keyup', filterBooks);

function filterBooks() {
    let filterBookValue = document.getElementById("searchBookTitle").value.toUpperCase();
    console.log(filterBookValue);

    let divBelumDibaca = document.getElementById("incompleteBookshelfList");
    let articleBelumDibaca = divBelumDibaca.querySelectorAll("article.book_item");

    for(let i = 0; i < articleBelumDibaca.length; i++) {
        let h3BelumDibaca = articleBelumDibaca[i].getElementsByTagName('h3')[0];
        if(h3BelumDibaca.innerHTML.toUpperCase().indexOf(filterBookValue) > -1) {
            articleBelumDibaca[i].style.display = '';
        } else {
            articleBelumDibaca[i].style.display = 'none';
        }
    }

    let divSudahDibaca = document.getElementById("completeBookshelfList");
    let articleSudahDibaca = divSudahDibaca.querySelectorAll("article.book_item");

    for(let i = 0; i < articleSudahDibaca.length; i++) {
        let h3SudahDibaca = articleSudahDibaca[i].getElementsByTagName('h3')[0];
        if(h3SudahDibaca.innerHTML.toUpperCase().indexOf(filterBookValue) > -1) {
            articleSudahDibaca[i].style.display = '';
        } else {
            articleSudahDibaca[i].style.display = 'none';
        }
    }
}
