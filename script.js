Swal.fire({
    title: 'Bienvenido al juego del Ahorcado!',
    width: 600,
    padding: '3em',
    color: '#716add',
    background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
    backdrop: `
    rgba(0,0,123,0.4)
    url("https://sweetalert2.github.io/images/nyan-cat.gif")
    left top
    no-repeat
    `
})

const palabras = ['1', '12', '123', '1234', '12345'];
let palabra = '';
let palabraConGuiones = palabra.replace(/./g, "_");
let contadorDeFallos = 0;
let puntajeActual = 0;
var Jugador = {
    nombre: '',
    puntaje: 0,
};


String.prototype.replaceAt = function (index, character) { return this.substring(0, index) + character + this.substring(index + character.length); }

const inicializar = function () {
    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    for (const i in palabra) {
        palabraConGuiones = palabraConGuiones.replaceAt(i * 2, '_ ');
    }
};



inicializar();




document.querySelector('#guionbajo').innerHTML = palabraConGuiones;
document.querySelector('#calcular').addEventListener('click', () => {
    const letra = document.querySelector('#letras').value;
    let haFallado = true;
    for (const i in palabra) {
        if (letra == palabra[i]) {
            palabraConGuiones = palabraConGuiones.replaceAt(i * 2, letra);
            haFallado = false;
        }
    }

    if (haFallado) {
        contadorDeFallos++;
        document.querySelector('#ahorcado').style.backgroundPosition = -(243 * contadorDeFallos) + 'px 0';
        if (contadorDeFallos == 4) {
            alert('Derrota, la palabra era ' + palabra);
            Jugador.puntaje = puntajeActual;
            Jugador.nombre = prompt("HighScore! Ingresá tu nombre", "");
            inicializar();
        }
    } else {
        if (palabraConGuiones.indexOf('_') < 0) {
            puntajeActual += (4 - contadorDeFallos);
            //document.querySelector('#ganador').style.display = 'flex';
            alert('Ganaste!');
            inicializar();
        }
    }

    document.querySelector('#guionbajo').innerHTML = palabraConGuiones;
    document.querySelector('#letras').value = '';
    document.querySelector('#letras').focus();
});
