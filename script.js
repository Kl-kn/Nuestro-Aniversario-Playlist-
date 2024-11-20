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
            <img src="${cancion.portada}" alt="Portada de ${cancion.nombre}" loading="lazy">
            <span>${cancion.nombre}</span>
            <audio controls preload="metadata">
                <source src="${cancion.url}" type="audio/mp3">
                Tu navegador no soporta el elemento de audio.
            </audio>
        `;
        playlistContainer.appendChild(li);

        const audio = li.querySelector('audio');

        // Detener otras canciones al reproducir esta
        audio.addEventListener('play', () => {
            document.querySelectorAll('audio').forEach((otherAudio) => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                }
            });
        });

        // Reproducir automáticamente la siguiente canción al terminar
        audio.addEventListener('ended', () => {
            const nextAudio = playlistContainer.children[index + 1]?.querySelector('audio');
            if (nextAudio) {
                nextAudio.play();
            }
        });

        // Manejo de errores en la carga
        audio.addEventListener('error', () => {
            console.error(`Error al cargar el archivo: ${cancion.url}`);
        });
    });
}

// Llamamos a la función para cargar las canciones cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarCanciones);
