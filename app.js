const input  = document.querySelector('.input__section input')
const btn    = document.querySelector('.input__section button')
const player = document.getElementById('yohoho')

let kinopoisk = true

btn.addEventListener('click', ()=>{
    if(input.value != ''){
        getMovie()
    }
})
input.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter' && input.value != ''){
        getMovie()
    }
})

 if(sessionStorage.getItem('search-movie')){
    let movie = sessionStorage.getItem('search-movie')

     let kinopoisk = checkData(movie)

    if(kinopoisk){
        player.dataset.kinopoisk = movie
        player.dataset.title     = ''
    }
    if(!kinopoisk){
        player.dataset.kinopoisk = ''
        player.dataset.title     = movie
    } 
} 

if(localStorage.getItem('search-movies')) {
    const searchList = document.querySelector('.search__story').style = 'display: block;'
}
if(localStorage.getItem('dark-theme')) {
    const head = document.querySelector('.dark__theme').setAttribute('href', 'dark.css')
    const dark = document.querySelector('.dark').classList.add('white')
}


function getMovie(data){
    const name = input.value ? input.value : data
    
    createMovieList(name)

    sessionStorage.setItem('search-movie', name)

    location.reload()
}

function checkData(name){
    let movie = [...name]
    
    for(let i = 0; i < movie.length; i++){
        if(isNaN(+movie[i])){
            return false
            brek
        }
    }
    return true
}   

const movieList = document.querySelector('.movie__list')
const moviesBtn   = document.querySelector('.name__block')

function createMovieList(data) {
    let movies = localStorage.getItem('search-movies')
    ?  JSON.parse(localStorage.getItem('search-movies'))
    :
    []
    
    if(movies.indexOf(data) == -1){
        movies.push(data)
    }
    
    localStorage.setItem('search-movies', JSON.stringify(movies))
}

moviesBtn.addEventListener('click', drawMovieList)

let showList = false

function drawMovieList() {
    movieList.innerHTML = ''

    let movies = JSON.parse(localStorage.getItem('search-movies'))
    const ul = document.createElement('ul')

    showList = !showList

    if(showList) {
        movieList.style = 'display:block;'
    } else {
        movieList.style = 'display:none;'
    }

    for(let i = 0; i < movies.length; i++){
        let li = document.createElement('li')
        let img = document.createElement('img')
        
        img.classList.add('remove')
        img.setAttribute('src', 'images/close.png')
        img.setAttribute('title', 'удалить')
        li.innerHTML = `<p class='name' title='нажмите для просмотра'>${movies[i].length > 20 ? movies[i].slice(0, 20) + '...' : movies[i]}</p>`
        li.append(img)

        ul.append(li)
    }
    movieList.append(ul)

    removeMovie()
    listValue()
}   

function removeMovie() {
    let remove = document.querySelectorAll('.remove')
    let movies = JSON.parse(localStorage.getItem('search-movies')) 

    remove.forEach((elem, i) => {
        elem.addEventListener('click', ()=>{
            movies.splice(i, 1)
            localStorage.setItem('search-movies', JSON.stringify(movies))
            showList = false
            drawMovieList()
        })
    })
}

//list value

function listValue() {
    const li = document.querySelectorAll('.movie__list li')

    li.forEach((el, i) => {
        el.addEventListener('click', (e) => {
            if(e.target.className == 'name') {
                let name = e.target.innerText
                newMovieName(name)
            }
        })

        if(i % 2 == 0){
            el.classList.add('li__style')
        }
    })
}

function newMovieName(name) {
    
     getMovie(name) 
}

// dark theme

const dark = document.querySelector('.dark')
let darkActive = false

dark.addEventListener('click', ()=>{
    const head = document.querySelector('.dark__theme')
    
    darkActive = !darkActive

    if(darkActive){
        head.setAttribute('href', 'dark.css')
        dark.classList.add('white')

        localStorage.setItem('dark-theme', darkActive)
    } else {
        head.setAttribute('href', '')
        dark.classList.remove('white')
        localStorage.setItem('dark-theme', darkActive)
    }
    
    
})
