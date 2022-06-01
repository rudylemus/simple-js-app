//placed array in IIFE
let pokemonRepository = (function() {

  let pokemonList = [];
  let apiUrl ='https://pokeapi.co/api/v2/pokemon/?limit=150';


  function add(pokemon) {
    (pokemon.name && pokemon.detailsUrl) {
        pokemonList.push(pokemon);
      } else {
        console.log('Pokemon is not correct!');
      }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let ul = document.querySelector('ul');
    let listItem = document.createElement('li');
    listItem.classList.add('col-sm-8');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.addEventListener('click', (event) => {
      showDetails(pokemon);
      event.target.blur();
    });

    button.classList.add('btn', 'btn-block', 'btn-outline-primary');
    button.classList.add('m-1', 'bg-blue', 'text-capitalize');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '.modal');

    listItem.appendChild(button);
    ul.appendChild(listItem);

  }


    function showDetails(pokemon) {
      loadDetails(pokemon).then(() => {
        showModal(pokemon);
      });
    }

  function showModal(pokemon) {
    //assign attributes to div classes
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    //clear modal content so it doesnt continue to add
    modalTitle.empty();
    modalBody.empty();


    let pokemonName = $(`<h1>${pokemon.name}</h1>`);
    let pokemonHeight = $(`<p> Height : ${pokemon.height} </p>`);
    let pokemonWeight = $(`<p> Weight : ${pokemon.weight} </p>`);
    let pokemonImage = $(`<img class="modal-img" src="${pokemon.imageUrl}" alt="Picture of ${pokemon.name}" style="width: 50%">`);
    let pokemonTypes = $(`<p> Type : ${pokemon.types.join(', ')}</p>`);


    modalTitle.append(pokemonName);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonTypes);

  }

  //promise function
  function loadList() {
    return fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => {
      json.results.forEach((item) => {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
          };
          add(pokemon);
        }); //catch if errors
      })
      .catch((err) => console.log(err));
    }


    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url)
      .then((res) => res.json())
      .then((details) => {
        item.weight = details.weight;
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        let types = [];
        details.types.forEach((item) => types.push(item.type.name));
        item.types = types;
      })
      .catch((err)  => console.log(err));
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


pokemonRepository.loadList().then(() => {
  pokemonRepository
    .getAll()
    .forEach((pokemon) => {
      pokemonRepository.addListItem(pokemon);
  });
});
