const plan = document.getElementById('plan')
// const planVal = plan.querySelectorAll('option')
const planValue = document.getElementById('planValue')
const planBtn = document.getElementById('planBtn')

if(plan.value == ''){
    planBtn.disabled = true
}

plan.addEventListener('change', () =>{
    if(plan.value == ''){
        planValue.setAttribute('value', '')
        planBtn.disabled = true
    }
    if(plan.value == 'beginner'){
        planValue.setAttribute('value', '1500')
        planBtn.disabled = false
    }
    if(plan.value == 'pro'){
        planValue.setAttribute('value', '3000')
        planBtn.disabled = false
    }
    if(plan.value == 'promo'){
        planValue.setAttribute('value', '5000')
        planBtn.disabled = false
    }
    if(plan.value == 'gold'){
        planValue.setAttribute('value', '7000')
        planBtn.disabled = false
    }  
})