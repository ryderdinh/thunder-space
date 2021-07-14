const list = document.getElementsByClassName("list")
const content = document.getElementById("contentRp")
Array.from(list).forEach( element => {
    element.addEventListener("click", (e) => {
        let text = element.firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerText
        content.innerText = text
    })
})