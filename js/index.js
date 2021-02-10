const booksUrl = 'http://localhost:3000/books'
// let bookData = []

document.addEventListener("DOMContentLoaded", function() {
    main()
});

function main(){
    console.log("Hello World")
    // fetchBooks()
    renderBooksList()
    addClickListener()
}



function fetchBooks(id = ""){

    if (!id){
        return fetch(booksUrl + id)
        .then(resp => resp.json())
    }

    if (id){
        return fetch(booksUrl + id)
        .then(resp => resp.json())
    }
    // .then(books => {
    //     if (func && books.length)
    //         {books.forEach(book => func(book))}
    //     else if (func){
    //         func(books)
    //     }
    // })
}

function renderBooksList(){
    fetchBooks().then(books => books.forEach(book => renderBookLi(book)))
}

function renderBookLi(book){
    const ul = document.getElementById('list')
    const li = document.createElement('li')
    
    li.innerText = book.title
    li.dataset.id = book.id
    li.id = 'list-li'

    ul.append(li)
}

function addClickListener(){
    const body = document.querySelector('body')

    body.addEventListener('click', function(e){
        e.preventDefault

        if (e.target.id === "list-li"){
            fetchBookProfile(e.target)
        }

        if (e.target.id === 'like-btn'){
            toggleLikeStatus(e.target)
        }
    })
}

function fetchBookProfile(eventTarget){
    fetchBooks('/' + eventTarget.dataset.id).then(book => renderBookProfile(book))
}

function renderBookProfile(book){
    const div = document.getElementById('show-panel')
    div.innerHTML = ""

    const img = document.createElement('img')
    img.src = book.img_url

    const h3 = document.createElement('h3')
    h3.innerText = book.title

    let h3Sub = document.createElement('h3')

    if (book.subtitle){
        h3Sub.innerText = book.subtitle
    }

    const h3Author = document.createElement('h3')
    h3Author.innerText = book.author

    const p = document.createElement('p')
    p.innerText = book.description

    const ul = document.createElement('ul')
    ul.id = 'like-by-list'
    book.users.forEach(user => {
        const li = document.createElement('li')
        li.innerText = user.username
        li.id = user.username
        li.dataset.id = user.id
        ul.append(li)
    })
// debugger
    const likeButton = document.createElement('button')
    likeButton.innerText = 'LIKE'
    likeButton.id = 'like-btn'


    div.append(img, h3, h3Sub, h3Author, p, ul, likeButton)
    // debugger
}

function toggleLikeStatus(eventTarget){
    const pouros = document.getElementById('pouros')

    if (pouros){
        pouros.remove()
        const list = document.getElementById('like-by-list').childNodes
        const likeList = []
        // debugger
        list.forEach(li => {
            const obj = {}
            obj.id = li.dataset.id
            obj.username = li.id
            likeList.push(obj)
        })
         debugger

        const reqObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(likeList)
        }

        fetch(booksUrl, reqObj)
        
    }
}