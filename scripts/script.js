

// ?Evento que incia la App
window.addEventListener('DOMContentLoaded', iniciarApp);

// ?Botón back y botón next
const btnBack = document.getElementById('btn-back');
const btnNext = document.getElementById('btn-next');

const app = document.getElementById('app');
const addons = document.querySelectorAll('.addon');
const errorsContainer = document.querySelectorAll('.errors');

let contador = 1;
let errors = [];
let type = 'month'

// !Datos dinámicos del usuario.
const usuario = {
    user: '',
    email: '',
    phone: null,
    services: {
        plan: {
    
        },
        addons: [

        ]
    
    }
}


function iniciarApp() {
    selectYourPlan();
    pickAddons();
    paginador()
    disabledButtonBack()
    changeMontlyAndYearly()
}


function selectYourPlan() {
    const plans = document.querySelectorAll('.plan');


    plans.forEach( plan => {
        plan.addEventListener('click', () => {

            // !Variables Plan
            const planName = plan.children[1].children[0].textContent;
            const planPriceMonth = plan.children[1].children[1].textContent;
            const planPriceYear = plan.children[2].children[1].textContent;

            errors = [];
            // !Styles
            plan.style.border = `1px solid ${colorsPrimary.purplishBlue}`;


            switch (type) {

                case 'month':
                    usuario.services.plan = {
                        name: planName,
                        price: planPriceMonth
                    }
                    break;
                    
                case 'year':
                    usuario.services.plan = {
                        name: planName,
                        price: planPriceYear
                    }
                    break;

                default:
                    break;
            }
            
            
            


        })
    })
}

let colorsNeutral = {
    coolGray: 'hsl(231, 11%, 63%)',
    lightGray: 'hsl(229, 24%, 87%)',
    magnolia: 'hsl(217, 100%, 97%)',
    alabaster: 'hsl(231, 100%, 99%)',
    white: 'hsl(0, 0%, 100%)'
}

const colorsPrimary = {
    marineBlue: 'hsl(213, 96%, 18%)',
    purplishBlue: 'hsl(243, 100%, 62%)',
    pastelBlue: 'hsl(228, 100%, 84%)',
    light: 'hsl(206, 94%, 87%)',
    strawberryRed: 'hsl(354, 84%, 57%)'
}


function pickAddons() {

    for (let i = 0; i < addons.length; i++) {
        const app = document.getElementById('container__appResults');
        const div = document.createElement('div');
        const item = addons[i];
        
        item.addEventListener('input', (event) => {
            let parent = event.target.parentNode;

            // !Variables
            const addonName = item.children[1].children[0].textContent;
            const addonPriceMonth = item.children[2].textContent;
            const addonPriceYear = item.children[3].textContent;

    
            // ! Agrega estilos a los addons seleccionados
            if(event.target.checked) {
                
                parent.parentNode.style.border = `1px solid ${colorsPrimary.purplishBlue}`;
                parent.parentNode.style.backgroundColor = colorsNeutral.magnolia;

                for (let i = 0; i < usuario.services.addons.length; i++) {
                    const element = usuario.services.addons[i];
                    if( element.name.includes(addonName)) return;
                }

                switch (type) {
    
                    case 'month':
                        usuario.services.addons.push({
                            name: addonName,
                            price: addonPriceMonth
                        })
                        break;
                        
                    case 'year':
                        usuario.services.addons.push({
                            name: addonName,
                            price: addonPriceYear
                        })
                        break;
    
                    default:
                        break;
                }
    
                console.log(usuario.services.addons)
            } else {
                
                parent.parentNode.style = ''
        
                for (let i = 0; i < usuario.services.addons.length; i++) {
                    const element = usuario.services.addons[i];

                    if( element == addonName ) {

                    }
                    const indice = usuario.services.addons.indexOf(element);
                    if (indice !== -1) {
                        usuario.services.addons.splice(indice, 1);
                    }
                    console.log(indice)

                }

                console.log(usuario.services.addons)

            }
    
            // ! Creamos una entrada que pueda variar el valor, dependiendo que plan elijamos.
            // usuario.services.plan.name = plan.children[1].children[0].textContent;

            // console.log(addonPriceYear)

            

            div.classList.add('content-addon')
            div.innerHTML=`
                <div class="finish-addon">
                    
                    <h3 class="name-addon">
                        ${item.children[1].children[0].textContent}
                    </h3>
                        
    
    
                    <h3 class="price-addon">
                        ${item.children[2].textContent}
                    </h3>
                </div>
                
            `
            // if (!document.querySelector('.content-addon')) {
    
                app.appendChild(div)
            // }
    
        })
    }
}
function pagThankYou(param1) {
    const ty = document.querySelector('.content__thank-you');
    const footer = document.querySelector('.footer');
    
    if( contador == 5 ) {

        ty.style.display = 'flex';

        param1[3].style.backgroundColor = colorsPrimary.light;
        param1[3].style.color = 'black';
        
        footer.remove()
    } else {
        ty.style = ''
    }
}

const paginador = () => {
    // ? 4 steps content
    const contentSteps = document.querySelectorAll('.step');

    // ? Container 4 steps > div header
    const steps = document.querySelectorAll('.number');

    
    for (let i = 0; i < steps.length; i++) {
        const contentStep = contentSteps[i]
        const step = steps[i];

            // console.log(step)
        
        
        
        if(contentStep.dataset.step == contador) {
            step.style.backgroundColor = colorsPrimary.light;
            step.style.color = 'black';
            
            contentStep.style.display = 'flex';
            
            
            
        } else {
            
            step.style = ''
            contentStep.style = ''
        }
        
        
        
        
    }
    pagThankYou(steps)
}



btnBack.addEventListener('click', () => {

    if(contador<=1) return;
    if( contador >= 1 ) {
        btnBack.style.opacity = '1';

    } 
    contador--
    
    paginador()
    // console.log(contador)
    
    disabledButtonBack();
})

function changeMontlyAndYearly() {
    const switchName = document.getElementById('switch');
    const month = document.querySelector('.month');
    const year = document.querySelector('.year');
    const dataYears = document.querySelectorAll('.data-year');
    const dataMonths = document.querySelectorAll('.data-month');
    const addonMonths = document.querySelectorAll('.addon-month');
    const addonyears = document.querySelectorAll('.addon-year');
    
    // console.log(dataMonth)
    switchName.addEventListener('input', (ev) => {

        if(ev.target.checked) {
            type = 'year';

            year.style.color = colorsPrimary.marineBlue;
            month.style.color = '';
            
        } else {
            type = 'month'
            month.style.color = colorsPrimary.marineBlue;
            year.style.color = '';

        }

        for (let i = 0; i < dataMonths.length; i++) {
            const month = dataMonths[i];
            const year = dataYears[i];
            const addonMonth = addonMonths[i];
            const addonYear = addonyears[i];
            
            // console.log(year)

            // !Cambio precio de Month a Year
            if(ev.target.checked) {
                // !Plan
                month.style.display = 'none'
                year.style.display = 'flex'


                // !Addon
                addonMonth.style.display = 'none'
                addonYear.style.display = 'block'
                
            } else {
                // !Plan
                month.style = 'none'
                year.style = 'none'



                // !Addon
                addonMonth.style = ''
                addonYear.style = ''
            }
        }

    

    })
}


function showErrors() {
    
    // errors.forEach( error => {
    //     const errorElement = document.getElementById(`${error.field}Error`);
    //     errorElement.textContent =  error.message;
    // })

}


// ! Función para desactivar el botón 'btn-back' cuando el contador sea igual a 1.
function disabledButtonBack () {
    if( contador == 1 ) {
        btnBack.style.opacity = '0';
    } else {
        btnBack.style.opacity = '1'
    }
};

// !Btn Next
btnNext.addEventListener('click', () => {
    
    // ?Datos del formulario
    const entradaName = document.getElementById('name').value;
    const entradaEmail = document.getElementById('email').value;
    const entradaPhone = document.getElementById('phone').value;
    
    
    if(contador>= 5) return;
    
    usuario.user = entradaName;
    usuario.email = entradaEmail;
    usuario.phone = entradaPhone;

    console.log(usuario)

    errors = [];

    // !Validación Your Info
    if (!entradaName) {
        errors.push({
            field: 'name',
            message: 'El nombre es requerido'
        })
    }

    if (!entradaEmail || !entradaEmail.includes('@') || !entradaEmail.includes('.com')) {
        errors.push({
            field: 'email',
            message: 'El email es requerido'
        })
    }

    if (!entradaPhone) {
        errors.push({
            field: 'phone',
            message: 'El phone es requerido'
        })
    }

    
    // !Validación Select Plan
        
    if(!usuario.services.plan.length) {
        errors.push({
            stepName: 'SelectPlan',
            message: 'Plan empty'
        })
    }
    
    console.log(contador)
    console.log(errors)

    if (errors.length > 0) {
        showErrors();
        return
    }
    if(errors.length == 0) {

        contador++
    
        paginador()

        disabledButtonBack();
    }

})

// !Personal Info
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (ev) => {
    ev.preventDefault()
    
    

    // console.log(usuario)
})





