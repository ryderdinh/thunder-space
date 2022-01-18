const logBtn = document.getElementsByName("logBtn")
const activityLog = document.getElementById("activityLog")
Array.from(logBtn).forEach(function(element) {
    element.addEventListener('click', () => {
        let log = element.parentNode.lastElementChild.innerHTML
        activityLog.innerHTML = log
    })
  });