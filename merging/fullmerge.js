const TOP = true;
const BOTTOM = false;
const body = document.body;
const html = document.documentElement;
const footerElement = document.getElementsByTagName("footer")[0];
const headerElement = document.getElementsByTagName("header")[0];
const DOCUMENT_HEIGHT = footerElement.offsetTop;
console.log (body.scrollHeight, body.offsetHeight, 
    html.clientHeight, html.scrollHeight, html.offsetHeight)
console.log("height of document",DOCUMENT_HEIGHT)
console.log(footerElement.offsetTop);

let topButtonAlreadyVisible=false;
let downButtonAlreadyVisible=true;
let performingAnimationTop=false;
let performingAnimationBottom=false;


//fonction qui prend un certain nombre de millisecondes à s'exécuter
// prend comme paramètre le nombre de milisecondes que la fonction doit attendre avant de se terminer
// s'utilise en général avec l'instruction await dans une fonction asynchrone
//
//function that runs during ns milliseconds
//takes the number of milliseconds to wait as a parameter
//to use in async function with an await command
function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}


//create a scroll button in fixed position to the top if boolean parameter up is true
//create a scroll button to the bottom if boolean parameter up is false
//the button gets a fixed position 
//with css rule top equals to the string positionY 
//with css rule right equals to the string positionX      
//the inner html of the button is set to iconText
//=> a class scroll-button-top or scroll-button-down is added to the button 
function createScrollButton(up,positionX, positionY,iconText)
{
    /*      |  
            v
            B<---
                */                 

    const button = document.createElement("button");
    button.innerHTML=iconText;
    button.classList.add("scroll-button")
    if(up)
    {
        button.classList.add("scroll-button-top")
        button.addEventListener("click", (event)=>
        { 
            // scroll to the top of the webpage
            body.scrollTop = 0; // For Safari
            html.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        })
    }
    else
    {
        button.classList.add("scroll-button-bottom")
        button.addEventListener("click", (event)=>
        { 
            // scroll very far to the bottom of the webpage
            body.scrollTop=DOCUMENT_HEIGHT; // For Safari
            html.scrollTop=DOCUMENT_HEIGHT; // For Chrome, Firefox, IE and Opera
            //scroll to the footer of the page
            //footerElement.scrollIntoView();
        })
    }
    button.classList.add("btn");//btn btn-success btn-lg
    button.classList.add("btn-success");
    button.classList.add("btn-lg");
    button.classList.add("affix");
    button.style["position"]="fixed";
    button.style["z-index"]=2;
    button.style["right"]=positionX;
    button.style["top"]=positionY;
    console.log(button);
    body.appendChild(button);
    console.log(body)

}

//try to include a scroll to top button in the footer
//return true if including succeeded.
//false otherwise
function includeButtonInFooter()
{
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
        return true;
    }
    return false;

}



//create one scroll to top button and one scroll to bottom button on the right of the window
function initArrowButtons()
{
    console.log(body)
    createScrollButton(TOP, "0px","45%","<i class=\"fas fa-arrow-alt-circle-up\"></i>"
    +"<i class=\"fas fa-arrow-alt-circle-up\"></i>"
    +"<i class=\"fas fa-arrow-alt-circle-up\"></i>")
    createScrollButton(BOTTOM, "0px","55%","<i class=\"fas fa-arrow-circle-down\"></i>"
    +"<i class=\"fas fa-arrow-circle-down\"></i>"
    +"<i class=\"fas fa-arrow-circle-down\"></i>")
    console.log(body)
}



initArrowButtons()
if (includeButtonInFooter())
{
    console.log("bouton inclus dans le footer");
}
else
{
    console.log("inclusion du bouton dans le footer non réussie")
}




const topButtons = document.getElementsByClassName("scroll-button-top");
const downButtons = document.getElementsByClassName("scroll-button-bottom");
for (button of topButtons)
{
    button.style.opacity = 0;
}
for (button of downButtons)
{
    button.style.opacity = 1;
}



window.addEventListener("scroll",scrollFunctionPlanner);

async function scrollFunctionPlanner(event)
{
    let lastScrollPosition=event.pageY;
    if(performingAnimationTop && performingAnimationBottom)
    {
        
        console.log("we are doing both animation => event rejected",event.pageY);
        return "";
    }
    if(!performingAnimationTop)
    {
        console.log("animation 1")
        performingAnimationTop=true;
        await  animationTopButton(event);//guarantee that there is only one scroll event that can access the button at the same time
        performingAnimationTop=false;
    }
    if(!performingAnimationBottom)
    {
        console.log("animation 2")
        performingAnimationBottom=true;
        await  animationBottomButton(event);//guarantee that there is only one scroll event that can access the button at the same time
        performingAnimationBottom=false;
    }
    
}


async function animationTopButton(event) 
{
    //console.log("animation haute")
    let lastScrollPosition=event.pageY;

    //could be improved to switch between appearing and disappearing dynamically
    
    if (lastScrollPosition>600 && !topButtonAlreadyVisible) 
    {
        for(let opacity=0;opacity<=1;opacity+=0.1)
        {
            for (button of topButtons)
            {
                button.style.opacity = opacity;
            }
            await sleep(50);
        }
        //console.log("testaudessusde601",lastScrollPosition, event.pageY, topButtonAlreadyVisible, performingAnimationTop);
        topButtonAlreadyVisible=true;
    
    } 
    
    else if(lastScrollPosition<=600 && topButtonAlreadyVisible)
    {
        for(let opacity=1;opacity>=0;opacity-=0.1)
        {
            for (button of topButtons)
            {
                button.style.opacity = opacity;
            }
            await sleep(50);
        }
        //console.log("testendessousde599",lastScrollPosition, event.pageY, topButtonAlreadyVisible, performingAnimationTop);
        topButtonAlreadyVisible=false;
    }
    else{
        //console.log("else",lastScrollPosition, event.pageY, topButtonAlreadyVisible, performingAnimationTop);

    }    
}
async function animationBottomButton(event) 
{
    //console.log("animation basse")
    let lastScrollPosition=event.pageY;
    if (lastScrollPosition <= DOCUMENT_HEIGHT-600 && !downButtonAlreadyVisible) 
    {
        for(let opacity=0;opacity<=1;opacity+=0.1)
        {
            for (button of downButtons)
            {
                button.style.opacity = opacity;
            }
            await sleep(50);
        }
        downButtonAlreadyVisible=true;
        //console.log("apparition",lastScrollPosition, event.pageY, topButtonAlreadyVisible, performingAnimationBottom);

    } 
    else if(lastScrollPosition > DOCUMENT_HEIGHT-600 && downButtonAlreadyVisible)
    {
        for(let opacity=1;opacity>=0;opacity-=0.1)
        {
            for (button of downButtons)
            {
                button.style.opacity = opacity;
            }
            await sleep(50);
        }
        downButtonAlreadyVisible=false;
        //console.log("disparition",lastScrollPosition, event.pageY, topButtonAlreadyVisible, performingAnimationBottom);

    }
    else{
        //console.log("else",lastScrollPosition, event.pageY, topButtonAlreadyVisible, performingAnimationBottom);

    }  
}




