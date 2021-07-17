const eventName = document.getElementById('eventName')
const eventPosition = document.getElementById('eventPosition')
const handleEventName = document.getElementById("handleEventName")
const handleEventPosition = document.getElementById("handleEventPosition")
const btnSubmitEvent = document.getElementById("btnSubmitEvent")


btnSubmitEvent.addEventListener('click', () => {
    handleEventName.value = eventName.value
    handleEventPosition.value = eventPosition.value
})