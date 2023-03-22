const pokemonList = document.querySelector('#pokemonList');
const loadMoreButton = document.querySelector('#loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItems(limit, offset) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map((pokemon) => `
      <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>

          <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
      </li>
    `).join('');
  })
}

loadPokemonItems(limit, offset)

loadMoreButton.addEventListener('click', () => {
  offset += limit;

  const qtdRecordsWithNextPage = offset + limit;

  if(qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(newLimit, offset);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(limit, offset)
  }
})