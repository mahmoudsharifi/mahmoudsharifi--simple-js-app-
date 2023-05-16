const API_ROOT = "https://pokeapi.co/api/v2/"
// "https://pokeapi.co/api/v2/pokemon/"

const pokemonListDiv = document.querySelector('#pokemon-list')
const chosenPokemonDiv = document.querySelector('#chosen-pokemon')
const loadingDiv = document.querySelector('#loading-message')
const modal = document.querySelector('#modal')

/*
    What is callback?
        a callback is a function that is passed into another function as an argument
    What is a higher-order function?
        a function that takes a callback
    What are array methods?
        functions that can be called on arrays
    Anonymous arrow functions
        () => {}

    Array.forEach( (arrayElement, loopIndex)=>{} )

    let fruits = ['apple', 'banana']

    fruits.forEach( (fruit, fruitIndex) => {
        console.log(fruit, fruitIndex)
    } )

    `${}` <- template literal
    */

const offset = 0

async function getAllPokemon() {
    loadingDiv.innerHTML = "Loading..."
    pokemonListDiv.innerHTML = ""
    let response = await fetch(API_ROOT + `pokemon?limit=50&offset=${offset}`)
    let pokemon = await response.json()
    pokemon = pokemon.results
    // console.log(pokemon);
    pokemon.forEach((p, i) => {
        addListItem(p, i)
    })
    loadingDiv.innerHTML = ""
}

function addListItem(item, i) {
    pokemonListDiv.innerHTML += `
            <li class="list-group-item pokemon-list_pokemon">
                <div class="pl-number">
                    ${i + 1}
                </div>
                <div class="pl-name">
                    ${item.name}
                </div>
                <button class="btn-primary" onclick="showDetails('${item.url}')">
                    Choose
                </button>
            </li>
        `
}

function closeModal() {
    modal.style.display = "none"
    // allowScrolling()
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

function preventScrolling() {
    document.body.classList.add('prevent-scroll')
}

function allowScrolling() {
    document.body.classList.remove('prevent-scroll')
}

document.addEventListener('keyup', e => {
    if (e.key === "Escape") {
        closeModal()
    }
})

// modal.addEventListener('click', e => {
//     if (e.target === e.currentTarget) {
//         closeModal()
//     }
// })

getAllPokemon()