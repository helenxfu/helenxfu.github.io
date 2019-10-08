const apiData = {
  url: 'https://pokeapi.co/api/v2/',
  type: 'pokemon',
  id: '25'
}
const { url, type, id } = apiData
const apiUrl = `${url}${type}/${id}`
console.log(apiUrl)

fetch(apiUrl).then(data => data.json()).then(pokemon => generateHtml(pokemon))

const generateHtml = data => {
  const html = `<div>${data.name}</div>
  <img src=${data.sprites.front_default} alt>
  <div class="details">
    <span>Height: ${data.height}</span>
    <span>Height: ${data.weight}</span>
  </div>`

  const pokemonDiv = document.querySelector('.pokemon')
  pokemonDiv.innerHTML = html
}

