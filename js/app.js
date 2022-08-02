const btnEnviar = document.querySelector('#enviar')
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail')

const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')

 // expresion regular para validar emails
 const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// evento cuando la app arranca
document.addEventListener('DOMContentLoaded', () => { iniciarApp() })

// campos del formulario
email.addEventListener('blur', e => { validarFormulario(e) })
asunto.addEventListener('blur', e => { validarFormulario(e) })
mensaje.addEventListener('blur', e => { validarFormulario(e) })

// Enviar el email
formulario.addEventListener('submit', e => { enviarEmail(e) })

// resetear el formulario
btnReset.addEventListener('click', e => { resetFormulario() })

// Funciones a ejecutar 
const iniciarApp = () => {
    btnEnviar.disabled = true
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

// validar el formulario
const validarFormulario = e => {
    if(e.target.value.length > 0){
        // elimina los errores
        const error = document.querySelector('p.error')
        if(error){
            error.remove()
        }

        e.target.classList.remove('border', 'border-red-500')
        e.target.classList.add('border', 'border-green-500')
    }else{
        e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-red-500')

        mostrarError('Todos los campos son obligatorios')
    }

    if(e.target.type === 'email'){
       

        if(er.test(e.target.value)){
             // elimina los errores
            const error = document.querySelector('p.error')
            if(error){
                error.remove()
            }
        
            e.target.classList.remove('border', 'border-red-500')
            e.target.classList.add('border', 'border-green-500')
        }else{
            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500')
            mostrarError('Email no valido')
        }
    }

    if (er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
}

// Mostrar error al no llenar los campos
const mostrarError = (mensaje) => {
    const mensajeError = document.createElement('p')
    mensajeError.textContent = mensaje
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'mt-5', 'text-center',
    'error')

    const errores = document.querySelectorAll('.error')
    if(errores.length === 0) {
        formulario.appendChild(mensajeError)
    }

}

// mostrar un mensaje al enviar 
const enviarEmail = e => {
    e.preventDefault()

    // mostrar el spinner
    const spinner = document.querySelector('#spinner')
    spinner.style.display = 'flex'

    // ocultar el spinner despues de 3 segundos
    setTimeout(() => {
        spinner.style.display = 'none'

        // Mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p')
        parrafo.textContent = 'El mensaje se envio correctamente'
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')

        formulario.insertBefore(parrafo, spinner)

        setTimeout(() => {
            parrafo.remove()
    
            resetFormulario()
        }, 5000);

    }, 3000);

}

// funcion que resetea el formulario
const resetFormulario = () => {
    formulario.reset()

    iniciarApp()
}
