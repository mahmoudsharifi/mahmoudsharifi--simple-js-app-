const API_ROOT = "https://pokeapi.co/api/v2/"
                // "https://pokeapi.co/api/v2/pokemon/"

const pokemonListDiv = document.querySelector('#pokemon-list')
const chosenPokemonDiv = document.querySelector('#chosen-pokemon')

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
    pokemonListDiv.innerHTML = ""
    let response = await fetch(API_ROOT + `pokemon?limit=50&offset=${offset}`)
    let pokemon = await response.json()
    pokemon = pokemon.results
    // console.log(pokemon);
    pokemon.forEach((p, i) => {
        addListItem(p, i)
    })
}

function addListItem(item, i) {
    pokemonListDiv.innerHTML += `
            <div class="pokemon-list_pokemon">
                <div class="pl-number">
                    ${i+1}
                </div>
                <div class="pl-name">
                    ${item.name}
                </div>
                <button class="pl-button" onclick="showDetails('${item.url}')">
                    Choose
                </button>
            </div>
        `
}

async function showDetails(url) {
    let response = await fetch(url)
    let pokemon = await response.json()
    console.log(pokemon);
    chosenPokemonDiv.innerHTML = `
        <img src="${pokemon.sprites.front_default}">
        <div>
            <div id="chosen-pokemon_name">
                #${pokemon.id} - ${pokemon.name}
            </div>
            <div id="chosen-pokemon_stats">
                <div>Height</div>
                <div>${pokemon.height}</div>
                <div>Weight</div>
                <div>${pokemon.weight}</div>
                <div>Type(s)</div>
                <div id="chosen-pokemon_types">
                
                </div>
            </div>
        </div>
    `
    let typesDiv = document.querySelector('#chosen-pokemon_types')
    let types = pokemon.types.map(x => x.type.name)
    types.forEach(type => {
        typesDiv.innerHTML += `
            <div class="cp-type">
                ${type}
            </div>
        `
    })
}

getAllPokemon()