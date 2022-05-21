//placed array in IIFE
let pokemonRepository = (function() {
let pokemonList = [
  {name: 'Bulbasaur', height: 0.7, type: ['grass','poison']},
  {name: 'Pikachu', height: 0.4, type: 'electic'},
  {name: 'Snorlax', height: 2.1, type: 'normal'},
  {name: 'Machoke', height: 1.5, type: 'fighting'},
  {name: 'Charizard', height: 1.7, type: ['fire','flying']}
];

return {
  add: function(pokemon) {
    pokemonList.push(pokemon);
  },
  getAll: function() {
    return pokemonList;
  }
};
})();

// internal anonymous function to loop list
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(' ' + pokemon.name + ' height: ' + pokemon.height);
        if (pokemon.height > 2.0) {
          document.write('Wow that\'s big! ');
        }
  });
