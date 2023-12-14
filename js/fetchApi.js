// app.js

const url = 'https://pokeapi.co/api/v2/pokemon/';

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const pokemonList = document.getElementById('pokemon-list');
        data.results.forEach(pokemon => {
            const listItem = document.createElement('li');
            listItem.textContent = pokemon.name;
            pokemonList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });