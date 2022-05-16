let pokemonList = [
  {name: 'bulbasaur', height: 0.7, type: ['grass','poison']},
  {name: 'pikachu', height: 0.4, type: 'electic'},
  {name: 'snorlax', height: 2.1, type: 'normal'},
  {name: 'machoke', height: 1.5, type: 'fighting'},
  {name: 'charizard', height: 1.7, type: ['fire','flying']}
];
//loop to display all pokemon with their heights
for (let i = 0; i < pokemonList.length; i++)
{
document.write(pokemonList[i].name + " (height:" + pokemonList[i].height + ") ");

   if (pokemonList[i].height > 2.0) {
document.write('Wow that\'s big! ');
  }

}
