import { getPokemon, getPokemonSpecies } from './api.js';

const $form = document.querySelector('#form');
const $image = document.querySelector('#image');
const $description = document.querySelector('#description');

$form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData($form);
    const id = form.get('id');

    const { data: pokemonData } = await getPokemon(id);
    const { data: speciesData } = await getPokemonSpecies(id);

    const { flavor_text } = speciesData.flavor_text_entries.find(
        (flavor) => flavor.language.name === 'es'
    );

    console.log(flavor_text);

    $image.src = pokemonData.sprites.front_default;
    $description.innerText = flavor_text;

    console.log(id);
});
