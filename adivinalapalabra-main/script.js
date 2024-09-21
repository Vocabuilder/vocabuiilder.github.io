// Arreglo que contiene las palabras para jugar, relacionadas con gramática
let arrayPalabras = [
    "SUBSTANTIVO",  // Sustantivo
    "ADJETIVO",     // Adjetivo
    "VERBO",        // Verbo
    "ADVERBIO",     // Adverbio
    "CONJUNCION",   // Conjunción
    "PRONOMBRE"     // Pronombre
];

// Arreglo que contiene las ayudas de cada palabra
let ayudas = [
    "Tipo de palabra que nombra personas, lugares, cosas o ideas",   // Sustantivo
    "Tipo de palabra que describe o modifica un sustantivo",          // Adjetivo
    "Tipo de palabra que indica una acción, estado o proceso",        // Verbo
    "Tipo de palabra que modifica un verbo, adjetivo o adverbio",     // Adverbio
    "Tipo de palabra que une palabras, frases u oraciones",            // Conjunción
    "Tipo de palabra que sustituye a un sustantivo",                   // Pronombre
];

let cantPalabrasJugadas = 0;
let intentosRestantes = 5;
let posActual;
let arrayPalabraActual = [];
let cantidadAcertadas = 0;
let divsPalabraActual = [];
let totalQueDebeAcertar;

function cargarNuevaPalabra() {
    cantPalabrasJugadas++;
    if (cantPalabrasJugadas > 6) {
        arrayPalabras = [
            "SUBSTANTIVO", "ADJETIVO", "VERBO", "ADVERBIO", "CONJUNCION", "PRONOMBRE"
        ];
        ayudas = [
            "Tipo de palabra que nombra personas, lugares, cosas o ideas",
            "Tipo de palabra que describe o modifica un sustantivo",
            "Tipo de palabra que indica una acción, estado o proceso",
            "Tipo de palabra que modifica un verbo, adjetivo o adverbio",
            "Tipo de palabra que une palabras, frases u oraciones",
            "Tipo de palabra que sustituye a un sustantivo"
        ];
    }

    posActual = Math.floor(Math.random() * arrayPalabras.length);
    let palabra = arrayPalabras[posActual];
    totalQueDebeAcertar = palabra.length;
    cantidadAcertadas = 0;
    arrayPalabraActual = palabra.split('');

    document.getElementById("palabra").innerHTML = "";
    document.getElementById("letrasIngresadas").innerHTML = "";

    for (let i = 0; i < palabra.length; i++) {
        let divLetra = document.createElement("div");
        divLetra.className = "letra";
        document.getElementById("palabra").appendChild(divLetra);
    }

    divsPalabraActual = document.getElementsByClassName("letra");

    intentosRestantes = 5;
    document.getElementById("intentos").innerHTML = intentosRestantes;
    document.getElementById("ayuda").innerHTML = ayudas[posActual];

    arrayPalabras.splice(posActual, 1);
    ayudas.splice(posActual, 1);
}

cargarNuevaPalabra();

document.addEventListener("keydown", event => {
    if (isLetter(event.key)) {
        let letrasIngresadas = document.getElementById("letrasIngresadas").innerHTML;
        letrasIngresadas = letrasIngresadas.split('');

        if (letrasIngresadas.lastIndexOf(event.key.toUpperCase()) === -1) {
            let acerto = false;

            for (let i = 0; i < arrayPalabraActual.length; i++) {
                if (arrayPalabraActual[i] == event.key.toUpperCase()) {
                    divsPalabraActual[i].innerHTML = event.key.toUpperCase();
                    acerto = true;
                    cantidadAcertadas += 1;
                }
            }

            if (acerto) {
                if (totalQueDebeAcertar == cantidadAcertadas) {
                    for (let i = 0; i < arrayPalabraActual.length; i++) {
                        divsPalabraActual[i].className = "letra pintar";
                    }
                }
            } else {
                intentosRestantes -= 1;
                document.getElementById("intentos").innerHTML = intentosRestantes;

                if (intentosRestantes <= 0) {
                    for (let i = 0; i < arrayPalabraActual.length; i++) {
                        divsPalabraActual[i].className = "letra pintarError";
                    }
                }
            }

            document.getElementById("letrasIngresadas").innerHTML += event.key.toLocaleUpperCase() + " - ";
        }
    }
});

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
