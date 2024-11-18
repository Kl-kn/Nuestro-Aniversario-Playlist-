// Lista de canciones con las rutas locales de los archivos MP3 y las portadas
const canciones = [
    { nombre: "Sparks", url: "Coldplay - Sparks.mp3", portada: "Sparks.jpeg" },
    { nombre: "Yellow", url: "Coldplay - Yellow.mp3", portada: "Sparks.jpeg" },
    { nombre: "Die With A Smile", url: "01 Die with a Smile.mp3", portada: "Die With A Smile.jpeg" },
    { nombre: "Quiero Perderme Contigo", url: "y2mate.com - José José  Quiero Perderme Contigo Cover Audio.mp3", portada: "Quiero Perderme Contigo.jpg" },
    { nombre: "Delirio", url: "Luis Miguel - Delirio.mp3", portada: "Segundo Romance.jpeg" },
    { nombre: "La Gloria Eres Tu", url: "Luis Miguel - La Gloria Eres Tú (Video Con Letra).mp3", portada: "Romances.jpeg" }
];

// Seleccionamos el contenedor de la lista
const playlistContainer = document.getElementById('playlist');

// Función para crear la lista de canciones
function cargarCanciones() {
    canciones.forEach((cancion, index) => {
        const li = document.createElement('li');
        li.className = 'cancion-item'; // Clase CSS para un diseño uniforme
        li.innerHTML = `
            <img src="${cancion.portada}" alt="Portada de ${cancion.nombre}">
            <span>${cancion.nombre}</span>
            <audio controls>
                <source src="${cancion.url}" type="audio/mp3">
                Tu navegador no soporta el elemento de audio.
            </audio>
        `;
        playlistContainer.appendChild(li);

        const audio = li.querySelector('audio');

        // Cuando se reproduce una canción, detendremos cualquier otra que se esté reproduciendo
        audio.addEventListener('play', () => {
            // Detenemos todas las canciones que no sean la actual
            document.querySelectorAll('audio').forEach((otherAudio, otherIndex) => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0; // Volver al inicio
                }
            });
        });

        // Cuando una canción termine, se reproducirá automáticamente la siguiente
        audio.addEventListener('ended', () => {
            const nextIndex = index + 1;
            if (nextIndex < canciones.length) {
                const nextAudio = playlistContainer.children[nextIndex].querySelector('audio');
                nextAudio.play();
            }
        });
    });
}

// Llamamos a la función para cargar las canciones cuando se carga la página
cargarCanciones();
