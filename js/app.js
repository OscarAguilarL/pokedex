import { setImage, setPokemon } from './pokedex.js';

const $form = document.querySelector('#form');
const $nextPokemon = document.querySelector('#next-pokeon');
const $prevPokemon = document.querySelector('#prev-pokemon');
const $nextImage = document.querySelector('#next-image');
const $prevImage = document.querySelector('#prev-image');
const $pokedex = document.querySelector('#pokedex');
const $randomPokemon = document.querySelector('#randomPokemon');

const totalPokemons = 898;
let activePokemon = null;
let activeSprite = 0;

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

const handleNextImageClick = () => {
    if (activePokemon === null) return false;
    if (activeSprite >= activePokemon.sprites.length - 1) {
        activeSprite = 0;
        return setImage(activePokemon.sprites[activeSprite]);
    }
    activeSprite++;
    return setImage(activePokemon.sprites[activeSprite]);
};

const handlePrevImageClick = () => {
    if (activePokemon === null) return false;
    if (activeSprite <= 0) {
        activeSprite = activePokemon.sprites.length - 1;
        return setImage(activePokemon.sprites[activeSprite]);
    }
    activeSprite--;
    return setImage(activePokemon.sprites[activeSprite]);
};

$form.addEventListener('submit', handleSubmit);
$nextPokemon.addEventListener('click', handleNextClick);
$prevPokemon.addEventListener('click', handlePrevClick);
$randomPokemon.addEventListener('click', handleRandomPokemon);
$nextImage.addEventListener('click', handleNextImageClick);
$prevImage.addEventListener('click', handlePrevImageClick);
