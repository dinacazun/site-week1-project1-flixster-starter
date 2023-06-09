//global constants

const moviesGrid = document.querySelector(".now-playing")
const searchGrid = document.querySelector(".search")
const searchForm = document.querySelector("#search-form")
const searchInput = document.querySelector("#search-input")
const loadMoreButton = document.querySelector("#load-more-movies-btn")
const exitButton = document.querySelector("#close-search-btn")

const apiBaseUrl = "https://api.themoviedb.org/3"
const imageBaseUrl = "https://image.tmdb.org/t/p"
const apiKey = "d948dea63dbbfa2994ee7e74f65c555f"
let currentApiPage = 1
const newUrl = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;
//const moreUrl = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;
const q = "sticker"
const limit = 16
const offset = 0
const rating = "g"
const lang = "en"
const randomId = "e826c9fc5c929e0d6c6d423841a282aa"
const bundle = "messaging_non_clips"


//the movies array has all the movies that are returned
movies = []

function displayGridWithMovies(movies){
    console.log("Hey!")
    movies.forEach((element) => {
        console.log(element);
        url = `${imageBaseUrl}/w342${element.poster_path}`;
        moviesGrid.innerHTML += generateMovieHTML(element);
    })
    searchGrid.classList.add("hidden")
    moviesGrid.classList.remove("hidden")
}

function displaySearchGridWithMovies(movies){
    console.log("Hey!")
    movies.forEach((element) => {
        console.log(element);
        url = `${imageBaseUrl}/w342${element.poster_path}`;
        moviesGrid.classList.add("hidden")
        searchGrid.classList.remove("hidden")
        searchGrid.innerHTML += generateMovieHTML(element);
    })
}

//Render div element for a single movie
function generateMovieHTML(element){
    url = `${imageBaseUrl}/w342${element.poster_path}`;
    return `
    <div class = "card">
        <div class = "movie-card">
        <img class = "movie-poster" src = "${url}" alt = "image">
        <p class = "movie-title">${element.original_title}</p>
        <p class = "movie-votes">${element.vote_average}/10</p>
        </div>
    </div>
    `
}

async function getMovies(){
    const res = await fetch(`${apiBaseUrl}/movie/now_playing?api_key=${apiKey}&page=${currentApiPage}`);
    const data = await res.json()
    console.log(data)
    displayGridWithMovies(data.results)
}

async function getSearch(movieRequest){
    const res = await fetch(`${newUrl}&query=${movieRequest}&page=${currentApiPage}`);
    const data = await res.json()
    console.log(data)
    displaySearchGridWithMovies(data.results)
}

async function handleFormSubmit(event) {
    event.preventDefault()
    console.log(searchInput)
    getSearch(searchInput.value)
}

async function handleShowMore(event) {
    event.preventDefault()
    currentApiPage += 1
    console.log(currentApiPage);
    getMovies()
}

window.onload = function () {
    //add any event handlers here
    getMovies();
    searchForm.addEventListener('submit', handleFormSubmit);
    loadMoreButton.addEventListener('click', handleShowMore);
    exitButton.addEventListener('click', getMovies);
}