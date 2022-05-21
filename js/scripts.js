//placed array in IIFE
let pokemonRepository = (function() {
let pokemonList = [
  {name: 'Bulbasaur', height: 0.7, type: ['grass','poison']},
  {name: 'Pikachu', height: 0.4, type: 'electic'},
  {name: 'Snorlax', height: 2.1, type: 'normal'},
  {name: 'Machoke', height: 1.5, type: 'fighting'},
  {name: 'Charizard', height: 1.7, type: ['fire','flying']}
];

function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      repository.push(pokemon);
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
  addEvent(button, pokemon);
}
function addEvent(button,pokemon) {
  button.addEventListener('click', function() {
    showDetails(pokemon);

  });
}

function showDetails(pokemon) {
  console.log(pokemon);

}

return {
  add: function(pokemon) {
   pokemonList.push(pokemon);
 },
 getAll: function() {
   return pokemonList;
 },
  addListItem: addListItem
}

})();


pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

console.log(pokemonRepository.getAll());
