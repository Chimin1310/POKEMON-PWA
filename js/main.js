const pokemonInfo = document.getElementById('pokemon-info');

fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Manipular datos y actualizar UI
        console.log(data);
        displayResults(data);
    })
    .catch(error => {
        console.error('Error en la solicitud Fetch:', error);
        displayError(error.message);
    });

function displayResults(data) {
    // Actualizar UI para mostrar resultados
    const html = `
        <h2>${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p>Height: ${data.height}</p>
        <p>Weight: ${data.weight}</p>
    `;
    pokemonInfo.innerHTML = html;
}

function displayError(errorMessage) {
    // Actualizar UI para mostrar error
    pokemonInfo.innerHTML = `<p>Error: ${errorMessage}</p>`;
}
function storeDataInIndexedDB(data) {
    const transaction = db.transaction('pokemon', 'readwrite');
    const store = transaction.objectStore('pokemon');

    store.put({
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
    });

    console.log('Datos almacenados en IndexedDB con éxito.');
}