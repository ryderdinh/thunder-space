const functionAbc = () => {
    const swBtn = document.getElementsByClassName("dropdown-item delete");
    console.log(swBtn);
    Array.from(swBtn, (element) => {
      element.onclick = () => {
          console.log(element.parentNode);
          Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!',
              showClass: {
                  popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
              }
      
          }).then((result) => {
              if (result.value) {
                  element.parentElement.submit()
              }
          })
      }
    })
  };
  
  (()=>{
    functionAbc()
  })();
  
  const paginationBtn = document.getElementByClassName("paginate_button page-item");
  for (let i=0; i<paginationBtn; i++) {
    paginationBtn[i].addEventListener("click",()=>{
        setTimeOut(functionAbc(),500);
    })
  }