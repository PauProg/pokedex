const imageField = document.getElementById('pokemon-image');
const nameField = document.getElementById('pokemon-name');
const heightField = document.getElementById('pokemon-height');
const weightField = document.getElementById('pokemon-weight');
const typeField = document.getElementById('pokemon-type');
const inputField = document.getElementById('input-field');
const searchBtn = document.getElementById('search-btn');

// Escucha el evento 'keydown' en el input
inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { // Comprueba si la tecla es Enter
        searchBtn.click(); // Simula un clic en el botón
    }
});

searchBtn.addEventListener('click', () => {
    const pokemonName = inputField.value.toLowerCase().trim();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            // Actualizamos los campos con los datos
            nameField.textContent = `Nombre: ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`;
            heightField.textContent = `Altura: ${data.height / 10} m`;
            weightField.textContent = `Peso: ${data.weight / 10} kg`;
            typeField.textContent = `Tipo: ${data.types.map(type => type.type.name).join(', ')}`;
        
            // Imagen del Pokémon
            imageField.alt = data.name;
            imageField.style.display = 'block';
            imageField.src = data.sprites.front_default;
        })
        .catch(error => {
            console.error('Error:', error);
            
            // Limpiar los campos si ocurre un error
            nameField.textContent = 'Pokémon no encontrado';
            heightField.textContent = '';
            weightField.textContent = '';
            typeField.textContent = '';
            imageField.style.display = 'none';
        });
});