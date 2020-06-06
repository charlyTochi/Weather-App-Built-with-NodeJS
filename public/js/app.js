// this helps us to manipulate with the element when users make's use of element
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')//this gets the text value in the input
const messageOne = document.querySelector('#message-1')//this is how to target by id
const messageTwo = document.querySelector('#message-2')//this is how to target by id
const button = document.querySelector('button')//this is how to target by id


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value

    // messageOne.textContent = 'Loading please wait...'
    button.textContent = 'LOADING PLEASE WAIT...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                button.textContent = 'CLICK TO SEARCH WEATHER'
            } else {
                messageOne.textContent = ''
                messageTwo.textContent = data.location
                messageTwo.textContent = data.forecast.result
                button.textContent = 'CLICK TO SEARCH WEATHER'
                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    })

})

