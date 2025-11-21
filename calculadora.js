const pantalla = document.getElementById("pantalla");
const botones = document.querySelectorAll("button");

let operacion = "";
let limpiar = false;



// Actualizar pantalla
function actualizarPantalla() {
    pantalla.textContent = operacion || "0";
}

// Operación segura
function calcular() {
    try {
        operacion = eval(operacion).toString();
    } catch {
        operacion = "Error";
    }
    actualizarPantalla();
    limpiar = true;
}

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const valor = boton.innerText;

        // Limpiar si se presionó "=" antes
        if (limpiar && !isNaN(valor)) {
            operacion = "";
            limpiar = false;
        }

        // BOTÓN AC
        if (valor === "AC") {
            operacion = "";
            actualizarPantalla();
            return;
        }

        // BORRAR ÚLTIMO
        if (valor === "⌫") {
            operacion = operacion.slice(0, -1);
            actualizarPantalla();
            return;
        }

        // SIGNO +/-
        if (valor === "+/-") {
            if (operacion) {
                operacion = (parseFloat(operacion) * -1).toString();
                actualizarPantalla();
            }
            return;
        }

        // PORCENTAJE
        if (valor === "%") {
            if (operacion) {
                operacion = (parseFloat(operacion) / 100).toString();
                actualizarPantalla();
            }
            return;
        }

        // RAÍZ
        if (valor === "√") {
            if (operacion) {
                operacion = Math.sqrt(parseFloat(operacion)).toString();
                actualizarPantalla();
            }
            return;
        }

        // CUADRADO
        if (valor === "x²") {
            if (operacion) {
                operacion = Math.pow(parseFloat(operacion), 2).toString();
                actualizarPantalla();
            }
            return;
        }

        // IGUAL
        if (valor === "=") {
            calcular();
            return;
        }

        // Concatenar valores normales
        operacion += valor;
        actualizarPantalla();
    });
});
