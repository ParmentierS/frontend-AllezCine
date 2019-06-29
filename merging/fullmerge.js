//0) UTILITY FUNCTIONS and global variables

const body = document.body;
const footerElement = document.getElementsByTagName("footer")[0];
const headerElement = document.getElementsByTagName("header")[0];

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

function display(element, counter)
{
    console.log(counter + " [==>")
    console.log(element);
    for(child of element.children)
    {
        display(child,counter+1);
    }
    console.log("<==] " + counter)
}


//1) AGE RESTRICTION BOX : SEBASTIEN

async function ageRestrictionBox()
{
    //body hiding
    body.style["opacity"]=0;

    //getting dom elements
    const ageBox = document.getElementById("ageBox");
    const buttonYes = document.getElementsByClassName("yes")[0];
    const buttonNo = document.getElementsByClassName("no")[0];

    //everything should disappear
    const bodyChildren = body.children;
    console.table(bodyChildren);
    for(child of bodyChildren)
    {
        child.style["display"]="none";
    }
    ageBox.style["display"]="";


    //showing body again
    body.style["opacity"]=1;
    //and ageBox appear
    
    console.log(body,ageBox,buttonYes,buttonNo,bodyChildren);
    console.table(body.innerHTML);
    console.table(bodyChildren);

    //setting 2 event listeners for yes and no button
    let clicked = false;
    buttonNo.addEventListener("click",
        async ()=>
        {
            //trolling mode activated
            ageBox.style["display"]="none";
            const sectionVideo = document.createElement("section");
            sectionVideo.innerHTML="<iframe width=\"100%\" height=\"640\" src=\"https://www.youtube.com/embed/3xYXUeSmb-Y?rel=0&amp;controls=0&amp;showinfo=0;autoplay=1\""
            +" frameborder=\"0\" allow=\"accelerometer; autoplay=1; encrypted-media; gyroscope;" 
            +" picture-in-picture\" allowfullscreen></iframe>"
            document.body.append(sectionVideo);
   
            await sleep(10000);

            //with replace we don't keep the previous page in history
            window.location.replace("https://www.imdb.com/");
            clicked=true;  //the while loop can end now
            document.body.style["display"]="none";
        }
    )
    buttonYes.addEventListener("click",
        ()=>
        {
            ageBox.style["display"]="none";
            clicked=true;
        }
    )
    //waiting for clicking event
    while(!clicked)
    {
        await sleep(1000);
    }
    //everything reappear
    for(child of bodyChildren)
    {
        child.style["display"]="";
    }   
}






//2) COOKIE BOX : MAUD

async function cookieBox()
{
    /*very old maud code*/
    //should replace all of it with actual maud code

    let modal = document.querySelectorAll(".modal2")[1];
    console.log(modal);
    let btn = document.querySelectorAll(".myBtn");
    let btn1 = btn[2];
    let btn2 = btn[3];
    console.log(btn1);
    console.log(btn2);


    toggleModal();

    function toggleModal() {
        modal.classList.toggle("show-modal");
    }

    btn1.addEventListener('click', () => {
        modal.classList.toggle("hide-modal");
        console.log("1",modal.classList, modal)

    })

    btn2.addEventListener('click', () => {
        modal.classList.toggle("hide-modal");
        console.log("2",modal.classList, modal)

    })
}

//3) SCROLL BUTTONS

const TOP = true;
const BOTTOM = false;
const html = document.documentElement;
const DOCUMENT_HEIGHT = footerElement.offsetTop;
console.log (body.scrollHeight, body.offsetHeight, 
    html.clientHeight, html.scrollHeight, html.offsetHeight)
console.log("height of document",DOCUMENT_HEIGHT)

let topButtons = null;
let downButtons = null;
let topButtonAlreadyVisible=false;
let downButtonAlreadyVisible=true;
let performingAnimationTop=false;
let performingAnimationBottom=false;


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
async function initArrowButtons()
{
    console.log(body)
    createScrollButton(TOP, "0px","45%","<i class=\"fas fa-arrow-alt-circle-up\"></i>"
    +"<i class=\"fas fa-arrow-alt-circle-up\"></i>"
    +"<i class=\"fas fa-arrow-alt-circle-up\"></i>")
    createScrollButton(BOTTOM, "0px","55%","<i class=\"fas fa-arrow-circle-down\"></i>"
    +"<i class=\"fas fa-arrow-circle-down\"></i>"
    +"<i class=\"fas fa-arrow-circle-down\"></i>")
    console.log(body)
        if (includeButtonInFooter())
    {
        console.log("bouton inclus dans le footer");
    }
    else
    {
        console.log("inclusion du bouton dans le footer non réussie")
    }

    topButtons = document.getElementsByClassName("scroll-button-top");
    downButtons = document.getElementsByClassName("scroll-button-bottom");
    for (button of topButtons)
    {
        button.style.opacity = 0;
    }
    for (button of downButtons)
    {
        button.style.opacity = 1;
    }

    window.addEventListener("scroll",scrollFunctionPlanner);
}


async function scrollFunctionPlanner(event)
{
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

// 4) MORE MOVIES LESS MOVIES FILTER BUTTON : SEBASTIEN
const movieClassName = "col-3"
const showingNumber=3;

function show(listOfMovies)
{
    for(movie of listOfMovies)
    {
        movie.style["display"]="";
    }
}
function hide(listOfMovies)
{
    for(movie of listOfMovies)
    {
        movie.style["display"]="none";
    }
}
function filterMovies(filterName,moviesList, complementCondition)
{
    return moviesList.filter((element)=>
    {
        const img = element.getElementsByTagName("img")[0];
        const url=img.getAttribute("src");
        const nameAndFormat =url.split("/").pop();
        //console.log(nameAndFormat)
        const nameGenreYear = nameAndFormat.split(".").shift().split("-");
        //console.log(nameGenreYear);
        const movieGenre=nameGenreYear[2];
        const movieYear=nameGenreYear[1];

        if(movieGenre===filterName)
        {
            console.log("OK",url,movieGenre);
            return !complementCondition;
        }
        if(movieYear===filterName)
        {
            console.log("OK",url,movieYear);
            return !complementCondition;
        }
        console.log("NOT OK",url,movieGenre,movieYear,filterName);
        return complementCondition;
    })
}

async function activateFilterButtons()
{
    const featuredMoviesSection = document.getElementById("featured-movies");
    const featuredMoviesList = Array.from(featuredMoviesSection.getElementsByClassName(movieClassName));
    //warning to never modify featuredMoviesList directly we should clone it instead
    let filteredMoviesList = featuredMoviesList;
    let displayedMoviesList = featuredMoviesList;  
    let undisplayedMoviesList = [];

    console.log(featuredMoviesList,displayedMoviesList,undisplayedMoviesList)

    const buttonMore = document.getElementById("plusDeFilms");
    const buttonLess = document.getElementById("moinsDeFilms");

    buttonMore.addEventListener("click",()=>
        {
            if(filteredMoviesList.length > showingNumber &&  displayedMoviesList.length <= showingNumber)
            {
                displayedMoviesList=filteredMoviesList;
                undisplayedMoviesList=[];
                hide(displayedMoviesList)
                show(displayedMoviesList);
                console.log("more button if",displayedMoviesList,undisplayedMoviesList)
            }
            else{
                console.log("more button else",displayedMoviesList,undisplayedMoviesList)
            }
        }

    )

    buttonLess.addEventListener("click",()=>
        {
            if(filteredMoviesList.length <= showingNumber || displayedMoviesList.length <= showingNumber)
            {
                console.log("less button if",displayedMoviesList,undisplayedMoviesList)
            }
            else
            {
                undisplayedMoviesList=filteredMoviesList.filter((element,index) => index >= showingNumber);//index is one less
                displayedMoviesList=filteredMoviesList.filter((element,index) => index < showingNumber);
                show(undisplayedMoviesList);
                hide(undisplayedMoviesList);
                console.log("less button else",displayedMoviesList,undisplayedMoviesList)
            }
        }

    )


    const filterButtonTable=document.getElementsByClassName("filter")
    for (button of filterButtonTable)
    {
        button.addEventListener("click", (event)=>{

            console.log("event",event,"id", event.target.id,"filterL", filteredMoviesList,"completeL", featuredMoviesList, "UndL", undisplayedMoviesList,"DispL", displayedMoviesList);
            if(filteredMoviesList.length < featuredMoviesList.length)
            {
                filteredMoviesList=featuredMoviesList;
                undisplayedMoviesList=filteredMoviesList.filter((element,index) => index >= showingNumber);//index is one less
                displayedMoviesList=filteredMoviesList.filter((element,index) => index < showingNumber);
                show(featuredMoviesList);
                hide(undisplayedMoviesList);
                show(displayedMoviesList)
            }
            else
            {
                filteredMoviesList=filterMovies(event.target.id, featuredMoviesList, false);
                const restOfMovies=filterMovies(event.target.id, featuredMoviesList, true);
                show(restOfMovies)
                hide(restOfMovies);
                undisplayedMoviesList=filteredMoviesList.filter((element,index) => index >= showingNumber);//index is one less
                displayedMoviesList=filteredMoviesList.filter((element,index) => index < showingNumber);
                show(undisplayedMoviesList)
                hide(undisplayedMoviesList);
                show(displayedMoviesList)
                console.log("filterone", filteredMoviesList,"filterreverse", restOfMovies)
                
            }
            
            



        })
    }

}

// 5) CONTACT US LOG IN REGISTER FORMS : MAUD
async function activateFormsButtons()
{
    //Here goes Maud code
} 

// 6) SHOP MOVIES BUTTON : SEBASTIEN

async function activateShopMoviesButton()
{
    const shopMovieElement = document.getElementById("shop-movies-list");
    console.log(shopMovieElement);
    const shopMoviesList=shopMovieElement.getElementsByClassName("col-md-3");
    const numberOfSlides=Math.ceil(shopMoviesList.length / 4); // 40 -> 10 slides , 41 -> 11 slides
    let currentSlide = 1;//normal numerotation first slide : 1, second slide : 2
    console.log(shopMoviesList.length, numberOfSlides, currentSlide);
    hideEverySlide();
    showCurrentSlide();
    const scrollingLeft=document.getElementById("left-scrolling");
    const scrollingRight=document.getElementById("right-scrolling");
    scrollingLeft.addEventListener("click",()=>
        {
            if(currentSlide > 1)
            {
                hideCurrentSlide();  
                currentSlide--; 
                showCurrentSlide();
                
            }    
        }
    );
    scrollingRight.addEventListener("click",()=>
        {
            if(currentSlide < numberOfSlides)
            {
                hideCurrentSlide(); 
                currentSlide++;  
                showCurrentSlide();
                
            }    
        }
    );


    function hideEverySlide()
    {
        for(movie of shopMoviesList)
        {
            movie.style["display"]="none";
        }
    }

    function showSlide(slideNumber)
    {
        if (slideNumber < numberOfSlides && slideNumber>=1)
        {
            //aucune crainte
            for(let i = 4; i > 0; i--)
            {
                const index=slideNumber*4 - i;
                //console.log(index);
                shopMoviesList[index].style["display"]="";
            }

        }
        else if(slideNumber == numberOfSlides)
        {
            for(let i = 4; i > 0; i--)
            {
                const index=slideNumber*4 - i;
                if(index >= shopMoviesList.length)
                {
                    break;
                }
                shopMoviesList[index].style["display"]="";
            }
        }
    }
    function hideSlide(slideNumber)
    {
        if (slideNumber < numberOfSlides && slideNumber>=1)
        {
            //aucune crainte
            for(let i = 4; i > 0; i--)
            {
                const index=slideNumber*4 - i;
                shopMoviesList[index].style["display"]="none";
            }

        }
        else if(slideNumber == numberOfSlides)
        {
            for(let i = 4; i > 0; i--)
            {
                const index=slideNumber*4 - i;
                if(index >= shopMoviesList.length)
                {
                    break;
                }
                shopMoviesList[index].style["display"]="none";
            }
        }
    }
    function showCurrentSlide()
    {
        showSlide(currentSlide);
    }
    function showNextSlide()
    {
        if(currentSlide<numberOfSlides)
        showSlide(currentSlide+1);
    }
    function showPreviousSlide()
    {
        if(currentSlide>1)
        showSlide(currentSlide-1);
    }
    function hideCurrentSlide()
    {
        hideSlide(currentSlide);
    }
    function hideNextSlide()
    {
        if(currentSlide<numberOfSlides)
        hideSlide(currentSlide+1);
    }
    function hidePreviousSlide()
    {
        if(currentSlide>1)
        hideSlide(currentSlide-1);
    }
}


//7) LAUNCH EVERYTHING ONE BY ONE
async function main()
{
    display(body,0);
    await ageRestrictionBox();
    console.log("Demande de l'age terminée \o/")
    await cookieBox()
    console.log("Cookie box chargée \o/")
    await initArrowButtons()
    console.log("Boutons de défilement chargés \o/")
    //await activateFilterButtons();
    console.log("Filtres activés \o/")
    await activateFormsButtons();
    console.log("Formulaires chargés \o/")
    await activateShopMoviesButton();
    console.log("defilement du shop movie opérationel \o/")
    console.log("Site chargé, installez vous confortablement")
}
main();

/*
    - Copyright -
    Made by Maud Barbier, Ludovic Lambinon, Maxim Lopez & Sébastien Parmentier
*/