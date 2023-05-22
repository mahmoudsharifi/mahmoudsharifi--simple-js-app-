const API_ROOT = "https://pokeapi.co/api/v2/"

const pokemonListDiv = document.querySelector('#pokemon-list')
const chosenPokemonDiv = document.querySelector('#chosen-pokemon')
const loadingDiv = document.querySelector('#loading-message')
const modal = document.querySelector('#modal')
const searchForm = document.querySelector('#poke-search')

const offset = 0

let allPokemon = []
let shownPokemon = []

searchForm.addEventListener('submit', searchPokemon)

function searchPokemon(e) {
    e.preventDefault()
    const pokemonName = searchForm.name.value
    if (!pokemonName) return

    let searchResults = allPokemon.filter(pokemon => {
        return pokemon.name.includes(pokemonName)
    })

    if (!searchResults.length) return

    shownPokemon = searchResults
    renderPokemon()
}

function showAll() {
    shownPokemon = allPokemon
    renderPokemon()
}

async function getAllPokemon() {
    loadingDiv.innerHTML = "Loading..."
    pokemonListDiv.innerHTML = ""
    let response = await fetch(API_ROOT + `pokemon?limit=151&offset=${offset}`)
    let pokemon = await response.json()
    allPokemon = pokemon.results
    shownPokemon = pokemon.results
    renderPokemon()
    loadingDiv.innerHTML = ""
}

function renderPokemon() {
    pokemonListDiv.innerHTML = ""
    shownPokemon.forEach((p, i) => {
        addListItem(p, i)
    })
}

function addListItem(item, i) {
    pokemonListDiv.innerHTML += `
            <div class="list-group-item pokemon-list_pokemon">
                <div class="pl-number">
                    ${i + 1}
                </div>
                <div class="pl-name">
                    ${item.name}
                </div>
                <button class="btn-primary" onclick="showDetails('${item.url}')">
                    Choose
                </button>
            </div>
        `
}

async function showDetails(url) {
    let response = await fetch(url)
    let pokemon = await response.json()
    console.log(pokemon);
    showModal(pokemon)
    $('.modal').modal()
}

function showModal(pokemon) {
    $('.modal-text').html('<p>' + ' ' + '</p>');
    $('.modal-title').html(pokemon.name);

    $('.modal-body').html(`
        <div id="chosen-pokemon_image">
            <img src="${pokemon.sprites.front_default}">
        </div>
        <div id="chosen-pokemon_stats">
        </div>
    `)

    let stats = $('#chosen-pokemon_stats')
    stats.html(`
        <div>Height</div>
        <div>${pokemon.height}m</div>
        <div>Weight</div>
        <div>${pokemon.weight}kg</div>
        <div>Types</div>
        <div id="types"></div>
    `)

    let types = pokemon.types.map(x => x.type.name)
    $('#types').html(types.join(', '))
}

document.addEventListener('keyup', e => {
    if (e.key === "Escape") {
        closeModal()
    }
})


getAllPokemon()