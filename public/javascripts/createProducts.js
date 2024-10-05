document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input, #formulario textarea, #formulario select');

    const expresiones = {
        name: /^[a-zA-ZÀ-ÿ0-9\s,.-]{3,50}$/, // Letras y espacios entre 3 y 50 caracteres
        price: /^\d+(\.\d{1,2})?$/, // Precios con hasta 2 decimales
        description: /^[a-zA-ZÀ-ÿ0-9\s,.-]{1,500}$/, // Entre 10 y 500 caracteres
        stock: /^\d{1,1000}$/ // Solo números
    };

    const campos = {
        name: false,
        price: false,
        description: false,
        stock: false,
        category_id: true // Default en true porque siempre selecciona una opción
    };

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

    inputs.forEach((input) => {
        input.addEventListener('keyup', (e) => validarFormulario(e));
        input.addEventListener('blur', (e) => validarFormulario(e));
    });

    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "name":
                validarCampo(expresiones.name, e.target, 'name');
                break;
            case "price":
                validarCampo(expresiones.price, e.target, 'price');
                break;
            case "description":
                validarCampo(expresiones.description, e.target, 'description');
                break;
            case "stock":
                validarCampo(expresiones.stock, e.target, 'stock');
                break;
            case "category_id":
                campos.category_id = e.target.value ? true : false;
                break;
        }
    };

    formulario.addEventListener('submit', (e) => {
        if (!campos.name || !campos.price || !campos.description || !campos.stock || !campos.category_id) {
            e.preventDefault(); // Prevenir el envío si algún campo no es válido
            alert('Por favor, completa todos los campos correctamente.');
        }
    });
});
