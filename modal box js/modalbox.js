
    let modal = document.querySelector(".modal1");
    let trigger = document.querySelector(".trigger");
    let btn = document.querySelectorAll(".myBtn");
    let btn1 = btn[0];
    let btn2 = btn[1];

    toggleModal();

    function toggleModal() {
        modal.classList.toggle("show-modal1");
    }
  
    btn1.addEventListener('click', () => {
        modal.classList.toggle("hide-modal");

    })
    
    btn2.addEventListener('click', () => {
        modal.classList.toggle("hide-modal");

    })
   
	