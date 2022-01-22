import { getPokemon, getPokemonSpecies } from './api.js';

const $image = document.querySelector('#image');
const $description = document.querySelector('#description');
const $screen = document.querySelector('#screen');

const setImage = (img) => {
    $image.src = img;
};

const setDesc = (text) => {
    $description.innerText = text;
};

const loader = (isLoading = false) => {
    const img = isLoading ? 'url(./images/loading.gif)' : '';
    $screen.style.backgroundImage = img;
};

export const findPokemon = async (id) => {
    const { data: pokemonData } = await getPokemon(id);
    const { data: speciesData } = await getPokemonSpecies(id);

    const { flavor_text } = speciesData.flavor_text_entries.find(
        (flavor) => flavor.language.name === 'es'
    );

    return {
        id: pokemonData.id,
        sprites: pokemonData.sprites.front_default,
        description: flavor_text,
    };
};

export const setPokemon = async (id) => {
    loader(true); // loader
    const pokemon = await findPokemon(id);
    loader(false); // quitar loader

    setImage(pokemon.sprites);
    setDesc(pokemon.description);

    return pokemon
};
