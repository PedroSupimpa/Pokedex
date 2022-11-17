const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".input__seach");
const buttonNext = document.querySelector(".btn-next");
const buttonPrev = document.querySelector(".btn-prev");
const pokemonType = document.querySelector(".pokemon__type");
const pokemonType1 = document.querySelector(".pokemon__type1");

let seachPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIresponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  ); //await para esperar que o fetch conclua para passar p proximo step (precisa definir a function async)

  if (APIresponse.status == 200) {
    const data = await APIresponse.json(); //const data pra extrair o arquivo json  e await p esperar retornar o data

    return data;
  }
};

const renderPokemon = async (pokemon) => {
  //function async dnv pois e preciso esperar o fetchpokemon retornar
  pokemonName.innerHTML = "Loading ...";
  pokemonNumber.innerHTML = "";
  pokemonType.innerHTML = "";
  pokemonType1.innerHTML = "";
  pokemonType1.classList.remove(...pokemonType1.classList);

  const data = await fetchPokemon(pokemon);

  pokemonType.classList.remove(...pokemonType.classList);
  pokemonType1.classList.remove(...pokemonType1.classList);

  if (data) {
    pokemonImage.style.display = "block";
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    input.value = "";
    seachPokemon = data.id; //assim apos uma seach o seach e atualizado p id atual

    pokemonType.innerHTML = data["types"]["0"]["type"]["name"];
    pokemonType.classList.add(
      "pokemon__type",
      data["types"]["0"]["type"]["name"]
    );
    if (data["types"].length > 1) {
      pokemonType1.innerHTML = data["types"]["1"]["type"]["name"];
      pokemonType1.classList.add(
        "pokemon__type1",
        data["types"]["1"]["type"]["name"]
      );
    }
    
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not found :c";
    pokemonNumber.innerHTML = "";
    pokemonType.innerHTML = "";
    pokemonType1.innerHTML = "";
    input.value = "";
    pokemonType.classList.remove(...pokemonType.classList);
    pokemonType1.classList.remove(...pokemonType1.classList);
  }

  if (data.id >= 650) {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not found :c!";
    pokemonNumber.innerHTML = "";
    pokemonType.innerHTML = "";
    pokemonType1.innerHTML = "";
    input.value = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonNext.addEventListener("click", () => {
  if (seachPokemon < 649) {
    seachPokemon += 1;
  } else {
    seachPokemon = 1;
  }
  renderPokemon(seachPokemon);
});

buttonPrev.addEventListener("click", () => {
  if (seachPokemon > 1) {
    seachPokemon -= 1;
    renderPokemon(seachPokemon);
  }
});

renderPokemon(seachPokemon);
