  let myLibrary = [];
  if (localStorage.getItem("library")) {
    const savedLibrary = JSON.parse(localStorage.getItem("library"));
    myLibrary = savedLibrary.map(book => new Book(book.name, book.author, book.pages, book.read));
  }
  function Book(name, author, pages, read) {
      this.name = name;
      this.author = author;   
      this.pages = pages;
      this.read = read;
      this.id=crypto.randomUUID(); // generate a unique id for each book
    // the constructor...
  }
  function renderLibrary()
  {
    if(myLibrary.length===0) 
      {
        libraryContainer.innerHTML=`
        <h1 class="outlined-text">Your library is empty!</h1>`;
        libraryContainer.classList.remove("d-none");
        showLibrary.innerText="Close library";
        return;
      }
    libraryContainer.classList.remove("d-none");
    showLibrary.innerText="Close library";
    libraryContainer.innerHTML=``;
    for(let i=0;i<myLibrary.length;i++){
      const book =myLibrary[i];
      const bookCard = document.createElement("div");
      bookCard.classList.add("card", "text-center", "bg-dark", "text-white", "mb-3", "col-3", "mx-2","d-flex","justify-content-center","align-items-center","vw-30");
      bookCard.innerHTML=`
      <img class="img-fluid w-25"src="book.png"/>
      <p class="fs-4">Name:${book.name}</p>
      <p class="fs-5">Author:${book.author}</p>
      <p class="fs-6">Pages:${book.pages}</p>
      <p>Read:${book.read? "Yes":"No"}</p>
      <button class="delete btn btn-primary w-25 fs-6" book-id=${book.id}>
      Delete
      </button>
      `;
      libraryContainer.appendChild(bookCard);
    }
  }
  function adBookToLibrary() {
    const name=document.querySelector(".title").value;
    const author=document.querySelector(".author").value;   
    const pages=document.querySelector(".number-pages").value;
    const read=document.querySelector(".read").checked;
    const book =new Book(name,author,pages,read);
    myLibrary.push(book);    
    localStorage.setItem("library", JSON.stringify(myLibrary));
  }
  function deleteBook(id)
  {
    let index=myLibrary.findIndex(book=>book.id===id);
    myLibrary.splice(index,1);
    localStorage.setItem("library", JSON.stringify(myLibrary));
  }
  content=document.querySelector(".welcome");
  libraryContainer = document.querySelector(".library");
  addBookToLibrary=document.querySelector(".addBookToLibrary");
  addBookToLibrary.addEventListener("click", () => {
      content.classList.add("d-none");
      
      form = document.querySelector(".form");
      form.classList.remove("d-none");
      form.innerHTML = `
    <form class="bookForm form-group welcome container text-center mt-5 d-flex flex-column justify-content-center align-items-center text-white" id="form" action="">
      <label for="name">Book Title</label>
      <input class="title" type="text" id="name" name="name" required>
      <label for="author">Author</label>
      <input class="author" type="text" id="author" name="author" required>
      <label for="pages">Number of Pages</label>  
      <input class="number-pages" type="number" id="pages" name="pages" required>
      <label for="read">Have you read it?</label>
      <input class="read" type="checkbox" id="read" name="read">
      <button type="submit" class="btn" onclick=>Submit</button>
      </form>`;
    //content.classList.add("d-none");
    libraryContainer.classList.add("d-none");
    document.querySelector(".bookForm").addEventListener("submit",(e)=>{
      e.preventDefault();
      adBookToLibrary();
      form.classList.add("d-none");
      content.classList.remove("d-none");
      renderLibrary();
    });
  }
  );
  showLibrary = document.querySelector(".showLibrary");
  showLibrary.addEventListener("click", () => {
    // content.classList.add("d-none");
    if(showLibrary.innerText==="Show my library"){
      renderLibrary();
    document.querySelectorAll(".delete").forEach(button=>
      button.addEventListener("click",(e)=>{
        const id=e.target.getAttribute("book-id")
        deleteBook(id);
        renderLibrary();
      })
    )
  }
  else{
    libraryContainer.classList.add("d-none");
    showLibrary.innerText="Show my library";
  }
  });
  