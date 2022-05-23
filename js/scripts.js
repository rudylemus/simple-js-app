//placed array in IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl ='https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
  let pokemonList = document.querySelector('.pokemon-list'); // selects list
  let listItem = document.createElement('li'); // creates li
  let button = document.createElement('button'); // creates button
  button.innerText = pokemon.name; // display pokemon name in button
  button.classList.add('pokemon-list-button'); // adds class name to button for styling
  listItem.appendChild(button); // appends button to li so that it shows up
  pokemonList.appendChild(listItem); // appends li to ul
  button.addEventListener("click", function(event) {
    showDetails(pokemon); //event listener for click to show details
  });
  }
  //promise function
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }). then(function (json) {
      json.results.forEach(function (item) { //run foreach loop
        let pokemon = {
          name: item.name,
          detailUrl: item.url
        };
        add(pokemon);
      }); //catch if errors
    }).catch(function (e) {
      console.error(e);
    })
  }


  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }). then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }). catch(function (e) { //catch if errors
      console.error(e);
    });
  }

//function to log pokemon
  function showDetails(item) {
    loadDetails(item).then(function () {
      console.log(item);
    });
  }

  return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails
  };

})();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  })
});
