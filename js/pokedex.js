import { getPokemon, getPokemonSpecies } from './api.js';
import { createChart } from './charts.js';

const $image = document.querySelector('#image');
const $description = document.querySelector('#description');
const $screen = document.querySelector('#screen');
const $light = document.querySelector('#animatedLight');

export const setImage = (img) => {
    $image.src = img;
};

const setDesc = (text) => {
    $description.innerText = text;
};

const loader = (isLoading = false) => {
    const img = isLoading ? 'url(./images/loading.gif)' : '';
    $screen.style.backgroundImage = img;
};

export const speech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es';
    speechSynthesis.speak(utterance);
    $light.classList.add('is-animated');

    utterance.addEventListener('end', () =>
        $light.classList.remove('is-animated')
    );
};

export const findPokemon = async (id) => {
    const { data: pokemonData } = await getPokemon(id);
    const { data: speciesData } = await getPokemonSpecies(id);
    const sprites = [pokemonData.sprites.front_default];

    const stats = pokemonData.stats.map((item) => item.base_stat);

    for (let item in pokemonData.sprites) {
        if (
            item !== 'front_default' &&
            item !== 'other' &&
            item !== 'versions' &&
            pokemonData.sprites[item] !== null
        ) {
            sprites.push(pokemonData.sprites[item]);
        }
    }

    const { flavor_text } = speciesData.flavor_text_entries.find(
        (flavor) => flavor.language.name === 'es'
    );

    return {
        id: pokemonData.id,
        sprites,
        description: flavor_text,
        name: pokemonData.name,
        stats,
    };
};

let activeChart = null;
export const setPokemon = async (id) => {
    loader(true); // loader
    const pokemon = await findPokemon(id);
    loader(false); // quitar loader

    setImage(pokemon.sprites[0]);
    setDesc(pokemon.description);
    speech(`${pokemon.name}, ${pokemon.description}`);

    if (activeChart instanceof Chart) {
        activeChart.destroy();
    }
    activeChart = createChart(pokemon.stats, pokemon.statsName);

    return pokemon;
};
