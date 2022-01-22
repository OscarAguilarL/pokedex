import { getPokemon, getPokemonSpecies } from './api.js';

const $image = document.querySelector('#image');
const $description = document.querySelector('#description');

const setImage = (img) => {
    $image.src = img;
};

const setDesc = (text) => {
    $description.innerText = text;
};

export const findPokemon = async (id) => {
    const { data: pokemonData } = await getPokemon(id);
    const { data: speciesData } = await getPokemonSpecies(id);

    const { flavor_text } = speciesData.flavor_text_entries.find(
        (flavor) => flavor.language.name === 'es'
    );

    return {
        sprites: pokemonData.sprites.front_default,
        description: flavor_text,
    };
};

export const setPokemon = async (id) => {
    const { sprites, description } = await findPokemon(id);

    setImage(sprites);
    setDesc(description);
};
