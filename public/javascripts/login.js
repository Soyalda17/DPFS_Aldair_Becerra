document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('loginForm');
    const inputs = document.querySelectorAll('#loginForm input');

    // Ajustar las expresiones regulares
    const expresiones = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^[a-zA-ZÀ-ÿ0-9\s,.-]{8,35}$/, // 8 a 35 caracteres
    };

    const campos = {
        email: false,
        password: false
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
            case "email":
                validarCampo(expresiones.email, e.target, 'email');
                break;
            case "password":
                validarCampo(expresiones.password, e.target, 'password');
                break;
        }
    };

    // Validación individual de cada campo (solo cuando el usuario interactúe)
    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    // Validación global al intentar enviar el formulario
    formulario.addEventListener('submit', (e) => {
        if (!campos.email || !campos.password) {
            e.preventDefault(); // Prevenir el envío si algún campo no es válido
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        } else {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }
    });
});
