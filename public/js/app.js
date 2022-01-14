console.log('client side javascript file is loaded')



const weatherform=document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    const url= 'http://localhost:3000/weather?address='+location
    fetch(url).then((response) => {
        response.json().then((data) =>{
            if (data.Error)
            {
                console.log (data.Error)
                msg1.textContent = data.Error
                msg2.textContent =""
            }else {
                msg1.textContent=data.location
                msg2.textContent=data.forecast
            }
        })
        })    
})