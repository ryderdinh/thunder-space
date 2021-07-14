const department = document.getElementsByClassName('department')
const position = document.getElementsByClassName('position')
const inputDepartment = document.getElementById("department")
const inputPosition = document.getElementById('position')

Array.from(department).forEach(e => {
    e.addEventListener("click", () => {
        let text = e.innerText
       inputDepartment.value = text
    })
})
Array.from(position).forEach(e => {
    e.addEventListener("click", () => {
        let text = e.innerText
       inputPosition.value = text
    })
})
