import { setPokemon } from './pokedex.js';

const $form = document.querySelector('#form');
const $nextPokeon = document.querySelector('#next-pokeon');
const $prevPokemon = document.querySelector('#prev-pokemon');
const $pokedex = document.querySelector('#pokedex');
const $randomPokemon = document.querySelector('#randomPokemon');

let activePokemon = null;
const totalPokemons = 898;

const handleSubmit = async (e) => {
    e.preventDefault();
    $pokedex.classList.add('is-open');
    const form = new FormData($form);
    const id = form.get('id');

    activePokemon = await setPokemon(id);
};

const handleNextClick = async () => {
    const id =
        activePokemon === null || activePokemon.id === totalPokemons
            ? 1
            : activePokemon.id + 1;
    activePokemon = await setPokemon(id);
};

const handlePrevClick = async () => {
    const id =
        activePokemon === null || activePokemon.id === 1
            ? totalPokemons
            : activePokemon.id + 1;
    activePokemon = await setPokemon(id);
};

const handleRandomPokemon = async () => {
    const random = Math.floor(Math.random() * (totalPokemons - 1)) + 1;
    activePokemon = await setPokemon(random);
};

$form.addEventListener('submit', handleSubmit);
$nextPokeon.addEventListener('click', handleNextClick);
$prevPokemon.addEventListener('click', handlePrevClick);
$randomPokemon.addEventListener('click', handleRandomPokemon);
