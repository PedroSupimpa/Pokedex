

const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonName = document.querySelector('.pokemon__name');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__seach');
const buttonNext = document.querySelector('.btn-next');
const buttonPrev = document.querySelector('.btn-prev');
const pokemonType = document.querySelector('.pokemon__type');

let seachPokemon = 1;


const fetchPokemon = async (pokemon) => {

const APIresponse =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //await para esperar que o fetch conclua para passar p proximo step (precisa definir a function async)

    if(APIresponse.status == 200) {

    const data = await APIresponse.json(); //const data pra extrair o arquivo json  e await p esperar retornar o data

    return data;
    }
}

const renderPokemon = async (pokemon) => { //function async dnv pois e preciso esperar o fetchpokemon retornar
        pokemonName.innerHTML = 'Loading ...';
        pokemonNumber.innerHTML = '';
        pokemonType.innerHTML = '';
   
    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block';
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonType.innerHTML = data['types']['0']['type']['name']
        input.value = '';
        seachPokemon = data.id;    //assim apos uma seach o seach e atualizado p id atual

    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
        pokemonType.innerHTML = '';
        input.value ='';


    }

    if(data.id >= 650){
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c!';
        pokemonNumber.innerHTML = '';
        pokemonType.innerHTML = '';
        input.value ='';


    }
}


if (pokemonType == 'grass') {
 


}




form.addEventListener('submit', (event) => {
    event.preventDefault();    
    renderPokemon(input.value.toLowerCase());
    

    });

    buttonNext.addEventListener('click', () => {
        if(seachPokemon < 649){
        seachPokemon += 1;
        
        } else {
            seachPokemon = 1;
        }
        renderPokemon(seachPokemon);
        });

    buttonPrev.addEventListener('click', () => {
        if(seachPokemon > 1) {
        seachPokemon -= 1;
        renderPokemon(seachPokemon);
        }
        });
        
    

            renderPokemon(seachPokemon);
    

