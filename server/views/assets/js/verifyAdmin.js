const delBtn = document.getElementsByName("delBtn")
const userId = document.getElementById("userId")
Array.from(delBtn).forEach(function(element) {
    element.addEventListener('click', () => {
        userId.value = element.parentNode.firstElementChild.value
        // if( element.parentNode.firstElementChild.value !== "" ){
        //     eleme
        // }
    })
  });
