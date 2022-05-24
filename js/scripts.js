//placed array in IIFE
let pokemonRepository = (function() {

  let modalContainer = document.querySelector('#modal-container');
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
    return fetch(apiUrl)
    .then(function (response) {
      return response.json();
    }) .then(function (json) {
      json.results.forEach(function (item) { //run foreach loop
        var pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      }); //catch if errors
    }).catch(function (e) {
      console.error(e);
    })
  }


  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    })
    .catch(function (e) { //catch if errors
      console.error(e);
    });
  }

  //function to show modal of pokemon
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
    }

  function showModal(pokemon) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    //creating close button
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    //close modal by clicking close button
    closeButtonElement.addEventListener('click', hideModal);

    //inserting pokemon image to modal
    let imgElement = document.createElement('img');
    imgElement.src = pokemon.imageUrl;
    imgElement.classList.add('pokemon-front-image');
    imgElement.setAttribute('alt', 'image of ' + pokemon.name);

    //inserting pokemon name
    let titleElement = document.createElement('h1');
    titleElement.classList.add('pokemon-name');
    titleElement.innerText = pokemon.name;

    //inserting  height to modal
    let heightElement = document.createElement('p');
    heightElement.classList.add('pokemon-height');
    heightElement.innerText = 'Height: ' + pokemon.height;




    modal.appendChild(closeButtonElement);
    modal.appendChild(imgElement);
    modal.appendChild(titleElement);
    modal.appendChild(heightElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }


  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

//close modal with escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  //close modal by clicking off of it
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if(target === modalContainer) {
      hideModal();
    }
  });



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
