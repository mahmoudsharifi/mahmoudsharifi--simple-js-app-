const API_ROOT="https://pokeapi.co/api/v2/",pokemonListDiv=document.querySelector("#pokemon-list"),chosenPokemonDiv=document.querySelector("#chosen-pokemon"),loadingDiv=document.querySelector("#loading-message"),modal=document.querySelector("#modal"),offset=0;async function getAllPokemon(){loadingDiv.innerHTML="Loading...",pokemonListDiv.innerHTML="";let o=await (await fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")).json();(o=o.results).forEach((o,e)=>{addListItem(o,e)}),loadingDiv.innerHTML=""}function addListItem(o,e){pokemonListDiv.innerHTML+=`
            <li class="list-group-item pokemon-list_pokemon">
                <div class="pl-number">
                    ${e+1}
                </div>
                <div class="pl-name">
                    ${o.name}
                </div>
                <button class="btn-primary" onclick="showDetails('${o.url}')">
                    Choose
                </button>
            </li>
        `}async function showDetails(o){let e=await (await fetch(o)).json();console.log(e),showModal(e),$(".modal").modal()}function showModal(o){$(".modal-text").html("<p> </p>"),$(".modal-title").html(o.name),$(".modal-body").html(`
        <div id="chosen-pokemon_image">
            <img src="${o.sprites.front_default}">
        </div>
        <div id="chosen-pokemon_stats">
        </div>
    `);$("#chosen-pokemon_stats").html(`
        <div>Height</div>
        <div>${o.height}m</div>
        <div>Weight</div>
        <div>${o.weight}kg</div>
        <div>Types</div>
        <div id="types"></div>
    `);let e=o.types.map(o=>o.type.name);$("#types").html(e.join(", "))}function preventScrolling(){document.body.classList.add("prevent-scroll")}function allowScrolling(){document.body.classList.remove("prevent-scroll")}document.addEventListener("keyup",o=>{"Escape"===o.key&&closeModal()}),getAllPokemon();