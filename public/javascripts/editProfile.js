document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input');

    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{3,25}$/, // Letras y espacios
        telefono: /^\d{9,14}$/, // 9 a 14 números
        location: /^[a-zA-ZÀ-ÿ0-9\s,.-]{1,100}$/ // Ubicación con letras, números y puntuaciones
    };

    const campos = {
        nombre: false,
        telefono: false,
        location: false
    };

    // Validar los campos
    const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
            campos[campo] = true;
        } else {
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
            campos[campo] = false;
        }
    };

    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "nombre":
                validarCampo(expresiones.nombre, e.target, 'nombre');
                break;
            case "telefono":
                validarCampo(expresiones.telefono, e.target, 'telefono');
                break;
            case "location":
                validarCampo(expresiones.location, e.target, 'location');
                break;
        }
    };

    // Validación individual de cada campo
    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    // Validación global al intentar enviar el formulario
    formulario.addEventListener('submit', (e) => {
        if (!campos.nombre || !campos.telefono || !campos.location) {
            e.preventDefault(); // Prevenir el envío si algún campo no es válido
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        } else {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }
    });
});
