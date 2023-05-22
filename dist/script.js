const API_ROOT="https://pokeapi.co/api/v2/",pokemonListDiv=document.querySelector("#pokemon-list"),chosenPokemonDiv=document.querySelector("#chosen-pokemon"),loadingDiv=document.querySelector("#loading-message"),modal=document.querySelector("#modal"),searchForm=document.querySelector("#poke-search"),offset=0;let allPokemon=[],shownPokemon=[];function searchPokemon(e){e.preventDefault();let o=searchForm.name.value;if(!o)return;let n=allPokemon.filter(e=>e.name.includes(o));n.length&&(shownPokemon=n,renderPokemon())}function showAll(){shownPokemon=allPokemon,renderPokemon()}async function getAllPokemon(){loadingDiv.innerHTML="Loading...",pokemonListDiv.innerHTML="";let e=await (await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")).json();allPokemon=e.results,shownPokemon=e.results,renderPokemon(),loadingDiv.innerHTML=""}function renderPokemon(){pokemonListDiv.innerHTML="",shownPokemon.forEach((e,o)=>{addListItem(e,o)})}function addListItem(e,o){pokemonListDiv.innerHTML+=`
            <div class="list-group-item pokemon-list_pokemon">
                <div class="pl-number">
                    ${o+1}
                </div>
                <div class="pl-name">
                    ${e.name}
                </div>
                <button class="btn-primary" onclick="showDetails('${e.url}')">
                    Choose
                </button>
            </div>
        `}async function showDetails(e){let o=await (await fetch(e)).json();console.log(o),showModal(o),$(".modal").modal()}function showModal(e){$(".modal-text").html("<p> </p>"),$(".modal-title").html(e.name),$(".modal-body").html(`
        <div id="chosen-pokemon_image">
            <img src="${e.sprites.front_default}">
        </div>
        <div id="chosen-pokemon_stats">
        </div>
    `);$("#chosen-pokemon_stats").html(`
        <div>Height</div>
        <div>${e.height}m</div>
        <div>Weight</div>
        <div>${e.weight}kg</div>
        <div>Types</div>
        <div id="types"></div>
    `);let o=e.types.map(e=>e.type.name);$("#types").html(o.join(", "))}searchForm.addEventListener("submit",searchPokemon),document.addEventListener("keyup",e=>{"Escape"===e.key&&closeModal()}),getAllPokemon();