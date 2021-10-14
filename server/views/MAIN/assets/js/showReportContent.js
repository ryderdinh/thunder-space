const showReportContent = () => {
    let swBtn = document.getElementsByClassName("report item");
    const reportContent = document.getElementById("report content")
    Array.from(swBtn, (element) => {
      element.onclick = () => {
       reportContent.innerText = element.firstElementChild.innerText
      };
    });
  };
  
  (() => {
    showReportContent();
    setInterval(() => {
      let dataPre;
      let datatableButtons = document.querySelector("#datatable-basic");
      if (dataPre !== datatableButtons.innerHTML) {
        showReportContent()
      }
    }, 1000);
  })();