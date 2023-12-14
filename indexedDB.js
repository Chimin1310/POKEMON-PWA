
const dbName = 'pokemonDB';
const dbVersion = 1;

let db;

const request = indexedDB.open(dbName, dbVersion);

request.onerror = (event) => {
    console.error('Error al abrir la base de datos:', event.target.error);
};

request.onsuccess = (event) => {
    db = event.target.result;
    console.log('Base de datos abierta con éxito:', db);
};

request.onupgradeneeded = (event) => {
    const db = event.target.result;

    // Crea un objeto de almacén (store) para contener la información del Pokémon
    const store = db.createObjectStore('pokemon', { keyPath: 'id' });

    // Define los índices
    store.createIndex('name', 'name', { unique: false });
    store.createIndex('height', 'height', { unique: false });
    store.createIndex('weight', 'weight', { unique: false });

    console.log('Estructura de la base de datos creada con éxito.');
};

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
