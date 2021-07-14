const eventName = document.getElementById('eventName')
const handleEvent = document.getElementById("handleEvent")
const btnSubmitEvent = document.getElementById("btnSubmitEvent")


btnSubmitEvent.addEventListener('click', () => {
    handleEvent.value = eventName.value
})