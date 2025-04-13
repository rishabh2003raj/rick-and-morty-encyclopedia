let currentPage = 1;

function fetchCharacters(page) {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then(res => res.json())
        .then(data => {
            displayCharacters(data.results);
            document.getElementById('pageInfo').textContent = `Page ${page} of ${data.info.pages}`;
        });
}

function displayCharacters(characters) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p>${character.species}</p>
            <p>Status: ${character.status}</p>
            <a href="detail.html?id=${character.id}" target="_blank">View Details</a>
        `;
        gallery.appendChild(card);
    });
}

document.getElementById('next').onclick = () => {
    currentPage++;
    fetchCharacters(currentPage);
};

document.getElementById('prev').onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        fetchCharacters(currentPage);
    }
};

function updateClock() {
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString(undefined, options);
    document.getElementById('clock').textContent = `${time} ${date}`;
}

setInterval(updateClock, 1000);
updateClock();
fetchCharacters(currentPage);

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    themeToggle.textContent = 'Switch to Dark Mode';
  } else {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    themeToggle.textContent = 'Switch to Light Mode';
  }
});

document.getElementById('random-character').addEventListener('click', () => {
    const randomId = Math.floor(Math.random() * 826) + 1;
    window.open(`details.html?id=${randomId}`, '_blank');
  });
  
