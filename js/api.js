const BASE_API = 'https://pokeapi.co/api/v2';

export const getPokemon = async (id) => {
    const resp = await fetch(`${BASE_API}/pokemon/${id}`);
    if (!resp.ok) {
        return {
            data: null,
            error: true,
        };
    }
    const data = await resp.json();

    return { data, error: false };
};

export const getPokemonSpecies = async (id) => {
    const resp = await fetch(`${BASE_API}/pokemon-species/${id}`);
    if (!resp.ok) {
        return {
            data: null,
            error: true,
        };
    }
    const data = await resp.json();

    return { data, error: false };
};
