
    let modal1 = document.querySelector(".modal1");
    let btn = document.querySelectorAll(".myBtn");
    let btn1 = btn[0];
    let btn2 = btn[1];

    toggleModal1();

    function toggleModal1() {
        modal1.classList.toggle("show-modal1");
    }
  
    btn1.addEventListener('click', () => {
        modal1.classList.toggle("hide-modal");

    })
    
    btn2.addEventListener('click', () => {
        modal1.classList.toggle("hide-modal");

    })
   
	