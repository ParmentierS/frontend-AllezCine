let modal = document.querySelector(".modal");
let trigger = document.querySelectorAll(".trigger");
let closeButton = document.querySelector(".close-button");
let closeB = document.querySelector(".closeb");
let b3 = document.querySelector(".btn3");
let id1 = document.querySelector('#id01');
let form = document.querySelector("#myForm");
let trig1 = trigger[0];
let trig2 = trigger[1];

function closeForm() {
  form.classList.remove("show-modal")
}

function closeForm2() {
  id01.classList.remove("show-modal")
}

function toggleM2() {
    form.classList.toggle("show-modal");
}

function toggleM() {
  id1.classList.toggle("show-modal");
}
function redirect() {
  form.classList.remove("show-modal");
  id01.classList.add("show-modal");
}
trig1.addEventListener("click", toggleM2);
trig2.addEventListener("click", toggleM);
closeB.addEventListener("click", closeForm);
closeButton.addEventListener("click", closeForm2);
b3.addEventListener("click", redirect);
