const tablero = document.getElementById('tablero');
const celdas = document.querySelectorAll('.celda');
const mensaje = document.getElementById('mensaje');
const resetBtn = document.getElementById('reset-btn');

let turno = 'X';
let ganador = null;
const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

inicioJuego();

resetBtn.addEventListener('click', reiniciarJuego);

function inicioJuego() {
    celdas.forEach(celda => {
        celda.addEventListener('click', clicEnCelda, { once: true });
    });
    actualizarMensaje(`Turno de ${turno}`);
}

function clicEnCelda(e) {
    const celda = e.target;
    const indice = parseInt(celda.id.split('-')[1]);

    // Verificar si la celda está vacía y el juego no ha terminado
    if (celda.textContent === '' && !ganador) {
        celda.textContent = turno;
        if (verificarGanador()) {
            ganador = turno;
            actualizarMensaje(`${ganador} ha ganado`);
        } else if (empate()) {
            actualizarMensaje('Empate');
        } else {
            cambiarTurno();
            actualizarMensaje(`Turno de ${turno}`);
        }
    }
}

function verificarGanador() {
    return combinacionesGanadoras.some(combinacion => {
        return combinacion.every(indice => {
            return celdas[indice].textContent === turno;
        });
    });
}

function empate() {
    return [...celdas].every(celda => {
        return celda.textContent !== '';
    });
}

function cambiarTurno() {
    turno = turno === 'X' ? 'O' : 'X';
}

function actualizarMensaje(mensajeText) {
    mensaje.textContent = mensajeText;
}

function reiniciarJuego() {
    turno = 'X';
    ganador = null;
    mensaje.textContent = '';
    celdas.forEach(celda => {
        celda.textContent = '';
    });
    inicioJuego();
}
