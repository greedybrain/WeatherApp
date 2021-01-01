const locationForm = document.querySelector('form')
const locationInput = document.querySelector('input')
const errMessage = document.querySelector('.p1')
const succMessage = document.querySelector('.p2')

const isLoading = () => {
        errMessage.textContent = ''
        succMessage.textContent = ''
        succMessage.textContent = 'Loading...'
}

const handleError = data => errMessage.textContent = data.error

const handleSuccess = data => succMessage.textContent = `It is ${ data.temperature } in ${ data.location }, but it feels like ${ data.feelslike }`

const getForecastInfo = async location => {
        //
        const url = `/weather?address=${ location }`
        try {
                const res = await fetch(url)
                const data = await res.json()
                if (data.error) return handleError(data)
                handleSuccess(data)
        } catch (error) { errMessage.textContent = error.message }
}

locationForm.addEventListener('submit', e => {
        e.preventDefault()

        isLoading()

        getForecastInfo(locationInput.value)  
        e.target.reset()
})
