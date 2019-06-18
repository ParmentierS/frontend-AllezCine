//Access to DOM elements

function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
let counter=0;
const body = document.getElementsByTagName("body")[0];
console.log(body);
function createButton(up,positionX, positionY,iconText)
{
    counter++;
    const button = document.createElement("button");
    button.innerHTML=iconText;
    button.id="thatSuperScrollButton"+counter;
    if(up)
    {
        button.addEventListener("click", (event)=>
        { 
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        })
    }
    else
    {
        button.addEventListener("click", (event)=>
        { 
            document.body.scrollTop = 1000000; // For Safari
            document.documentElement.scrollTop = 1000000; // For Chrome, Firefox, IE and Opera
        })
    }
    button.classList.add("btn");//btn btn-success btn-lg
    button.classList.add("btn-success");
    button.classList.add("btn-lg");
    button.classList.add("affix");
    button.style["position"]="fixed";
    button.style["z-index"]=counter;
    button.style["right"]=positionX;
    button.style["top"]=positionY;
    //button.style.left=positionX;
    //button.style.top=positionY;
    //button.classList.add("col-2");
    //button.classList.add("offset-5");
    console.log(button);
    body.appendChild(button);
    console.log(body)

}
//createButton(true, "200px","200px","Je veux monter please")
createButton(true, "0px","45%","<i class=\"fas fa-arrow-alt-circle-up\"></i>"
+"<i class=\"fas fa-arrow-alt-circle-up\"></i>"
+"<i class=\"fas fa-arrow-alt-circle-up\"></i>")
createButton(false, "0px","55%","<i class=\"fas fa-arrow-circle-down\"></i>"
+"<i class=\"fas fa-arrow-circle-down\"></i>"
+"<i class=\"fas fa-arrow-circle-down\"></i>")

//"<i class=\"fas fa-level-up-alt\"></i>"


const footerElement = document.getElementsByTagName("footer")[0];
const parentOfButton = footerElement.getElementsByClassName("parentButton")[0];
if(parentOfButton)
{
    const afterButton = parentOfButton.getElementsByClassName("afterButton")[0];   
    
    //Create button

    const button = document.createElement("button");
    button.innerHTML="<i class=\"fas fa-arrow-alt-circle-up\"></i>"
    +"<i class=\"fas fa-level-up-alt\"></i>"
    +"<i class=\"fas fa-arrow-alt-circle-up\"></i>";
    button.id="thatSuperScrollButton";
    if(afterButton)
    {
        parentOfButton.insertBefore(button, afterButton);
    }
    else
    {
        parentOfButton.appendChild(button);
    }
    console.log(button)
    console.log(parentOfButton)
    console.log(afterButton);
    button.addEventListener("click", (event)=>
    { 
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    })
    button.classList.add("btn");//btn btn-success btn-lg
    button.classList.add("btn-success");
    button.classList.add("btn-lg");
    button.classList.add("col-2");
    button.classList.add("offset-5");
    //button.classList.add("col-md-2");
    //button.classList.add("offset-md-5");
}





document.getElementById("thatSuperScrollButton1").style.opacity = 0;
document.getElementById("thatSuperScrollButton2").style.opacity = 0;

window.addEventListener("scroll",scrollFunctionPlanner);

let alreadyVisible=false;
let performingAnimation=false;

async function scrollFunctionPlanner(event)
{
    if(clockIsTicking)
    {
        console.log("clock is ticking event rejected",event.pageY);
        return "";
    }
    performingAnimation=true;
    await  scrollFunction(event);
    performingAnimation=false;
    
}
async function scrollFunction(event) {

    let lastScrollPosition=event.pageY;
    if (lastScrollPosition>600 && !alreadyVisible) 
    {
        for(let opacity=0;opacity<=1;opacity+=0.1)
        {
            document.getElementById("thatSuperScrollButton1").style.opacity = opacity;
            document.getElementById("thatSuperScrollButton2").style.opacity = opacity;
            await sleep(50);
        }
        console.log("testaudessusde601",lastScrollPosition, event.pageY, alreadyVisible, clockIsTicking);
        alreadyVisible=true;
    
    } 
    else if(lastScrollPosition<=600 && alreadyVisible)
    {
        for(let opacity=1;opacity>=0;opacity-=0.1)
        {
            document.getElementById("thatSuperScrollButton1").style.opacity = opacity;
            document.getElementById("thatSuperScrollButton2").style.opacity = opacity;
            await sleep(50);
        }
        console.log("testendessousde599",lastScrollPosition, event.pageY, alreadyVisible, clockIsTicking);
        alreadyVisible=false;
    }
    else{
        console.log("else",lastScrollPosition, event.pageY, alreadyVisible, clockIsTicking);

    }
    
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 
function downFunction() {
    document.body.scrollDown = 0; // For Safari
    document.documentElement.scrollDown = 0; // For Chrome, Firefox, IE and Opera
  } 