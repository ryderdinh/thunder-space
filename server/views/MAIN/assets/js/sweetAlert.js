const showAlert = () => {
    let swBtn = document.getElementsByClassName("dropdown-item delete");
    Array.from(swBtn, (element) => {
      element.onclick = () => {
        console.log(element.parentNode);
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        }).then((result) => {
          if (result.value) {
            element.parentElement.submit();
            Swal.fire(
              'Deleted!',
              'This user has been deleted.',
              'success'
          )
          }
        });
      };
    });
  };
  
  (() => {
    showAlert();
    setInterval(() => {
      let dataPre;
      let datatableButtons = document.querySelector("#datatable-basic");
      if (dataPre !== datatableButtons.innerHTML) {
        showAlert();
      }
    }, 1000);
  })();