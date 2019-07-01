let env = document.querySelector("#send");
let formi = document.querySelector("#myFormi");
let closeBi = document.querySelector(".closebi");
let test = document.querySelector(".ole");
let tt = document.querySelector(".ola");
let tot = document.querySelector(".olo");
let tet = document.querySelector(".olu");
let tit = document.querySelector(".oly");


function toggleM3() {
    formi.classList.toggle("show-modal3");
    let firstn = document.querySelector("#firstname").value;
    let lastn = document.querySelector("#lastname").value;
    let mail = document.querySelector("#exampleFormControlInput1").value;
    let sub = document.querySelector("#subject").value;
    let mess = document.querySelector("#exampleFormControlTextarea1").value;
    test.innerHTML = firstn;
    tt.innerHTML = lastn;
    tot.innerHTML = mail;
    tet.innerHTML = sub;
    tit.innerHTML = mess;
}

function closeForm1() {
    formi.classList.remove("show-modal3")
  }

env.addEventListener("click", toggleM3); 


closeBi.addEventListener("click", closeForm1);