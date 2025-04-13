const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function fetchCharacterDetails() {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => res.json())
        .then(character => {
            displayCharacterDetails(character);
        });
}

function displayCharacterDetails(character) {
    const detail = document.getElementById('characterDetail');
    detail.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Type: ${character.type || 'N/A'}</p>
        <p>Gender: ${character.gender}</p>
        <p>Origin: ${character.origin.name}</p>
        <p>Location: ${character.location.name}</p>
        <p>Episode Count: ${character.episode.length}</p>
    `;
}

function updateClock() {
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString(undefined, options);
    document.getElementById('clock').textContent = `${time} ${date}`;
}

setInterval(updateClock, 1000);
updateClock();
fetchCharacterDetails();
