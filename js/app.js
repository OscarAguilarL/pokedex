import { findPokemon, setPokemon } from './pokedex.js';

const $form = document.querySelector('#form');

const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData($form);
    const id = form.get('id');

    setPokemon(id);
};

$form.addEventListener('submit', handleSubmit);
