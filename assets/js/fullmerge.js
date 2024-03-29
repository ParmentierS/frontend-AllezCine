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
    console.log(element.localName,element.className,element.id)
    console.log(element);
    for(let child of element.children)
    {
        display(child,counter+1);
    }
    console.log(element.localName,element.className,element.id)
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
    console.log(buttonNo,buttonYes)

    //everything should disappear
    const bodyChildren = body.children;
    console.table(bodyChildren);
    for(let child of bodyChildren)
    {
        child.style["display"]="none";
    }
    //and ageBox appear
    ageBox.style["display"]="";

    //showing body again
    body.style["opacity"]=1;
    
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
            clicked=true;
        }
    )
    //waiting for clicking event
    while(!clicked)
    {
        await sleep(1000);
    }
    //everything reappear
    for(let child of bodyChildren)
    {
        child.style["display"]="";
    }   
    //ageBox disappear
    ageBox.style["display"]="none";
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

//strangely it doesn't work here /o/
/*const WINDOW_HEIGHT = window.innerHeight || (document.documentElement || document.body).clientHeight
const DOCUMENT_HEIGHT = getDocHeight();

function getDocHeight() 
{
    return Math.max(
        body.scrollHeight, html.scrollHeight,
        body.offsetHeight, html.offsetHeight,
        body.clientHeight, html.clientHeight
    )
}
REAL_HEIGHT = DOCUMENT_HEIGHT - WINDOW_HEIGHT;*/

//so we cheat /o/
footerElement.scrollIntoView();
REAL_HEIGHT= html.scrollTop;
body.scrollTop=0; // For Safari
html.scrollTop=0; // For Chrome, Firefox, IE and Opera


console.log (body.scrollHeight, body.offsetHeight, 
    html.clientHeight, html.scrollHeight, html.offsetHeight)
console.log("height of document",REAL_HEIGHT)

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
            body.scrollTop=REAL_HEIGHT; // For Safari
            html.scrollTop=REAL_HEIGHT; // For Chrome, Firefox, IE and Opera
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
    for(let button of topButtons)
    {
        button.style.opacity = 0;
    }
    for(let button of downButtons)
    {
        button.style.opacity = 1;
    }

    window.addEventListener("scroll",scrollFunctionPlanner);
}


async function scrollFunctionPlanner(event)
{
    // explanation in french of the concept of atomicity (the reason why I'm doing this)
    // https://fr.wikipedia.org/wiki/Atomicit%C3%A9_(informatique)
    // performing the animation of a button should be atomic
    // two scrolling events should not be performing the animation of the same button at the same time
    // errors could occur in that situation
    // also the animation should not stop in the middle 
    // (irreducible and indivisble animation)

    if(performingAnimationTop && performingAnimationBottom)
    {
        console.log("we are doing both animation => event rejected",event.pageY);
        return "";
    }
    if(!performingAnimationTop)
    {
        //guarantee that there is only one scroll event that can access the opacity of that button at the same time
        performingAnimationTop=true; //forbid access to ressource
        await  animationTopButton(event);
        performingAnimationTop=false; //autorize access to ressource
    }
    if(!performingAnimationBottom)
    {
        //guarantee that there is only one scroll event that can access the opacity of that button at the same time
        performingAnimationBottom=true; //forbid access to ressource
        await  animationBottomButton(event);
        performingAnimationBottom=false; //autorize access to ressource
    }

}

//could be improved to switch between appearing and disappearing dynamically 

async function animationTopButton(event) 
{
    //console.log("animation haute")
    let lastScrollPosition=event.pageY;
    
    if (lastScrollPosition>600 && !topButtonAlreadyVisible) 
    {
        for(let opacity=0;opacity<=1;opacity+=0.1)
        {
            for (let button of topButtons)
            {
                button.style.opacity = opacity.toFixed(1);
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
            for (let button of topButtons)
            {
                button.style.opacity = opacity.toFixed(1);
            }
            await sleep(50);
        }
        //console.log("testendessousde599",lastScrollPosition, event.pageY, topButtonAlreadyVisible, performingAnimationTop);
        topButtonAlreadyVisible=false;
    }
    else
    {
        //console.log("else",lastScrollPosition, event.pageY, topButtonAlreadyVisible, performingAnimationTop);

    }    
}
async function animationBottomButton(event) 
{
    //console.log("animation basse")
    let lastScrollPosition=event.pageY;
    if (lastScrollPosition <= REAL_HEIGHT-600 && !downButtonAlreadyVisible) 
    {
        for(let opacity=0;opacity<=1;opacity+=0.1)
        {
            for (let button of downButtons)
            {
                button.style.opacity = opacity.toFixed(1);
            }
            await sleep(50);
        }
        downButtonAlreadyVisible=true;
        //console.log("apparition",lastScrollPosition, event.pageY, topButtonAlreadyVisible, performingAnimationBottom);

    } 
    else if(lastScrollPosition > REAL_HEIGHT-600 && downButtonAlreadyVisible)
    {
        for(let opacity=1;opacity>=0;opacity-=0.1)
        {
            for (let button of downButtons)
            {
                button.style.opacity = opacity.toFixed(1);
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
// 3.5 LOADING JSON
let moviesInfoList=null;
async function loadJSON()
{ 
    const xhr = new XMLHttpRequest();
    xhr.onload = function()
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            console.log("chargement réussi");
            moviesInfoList = JSON.parse(this.responseText);
            console.log("liste des films : ",moviesInfoList);
            
        }
        else
        {
            console.log("Même pas foutu de charger un truc correctement")
            console.log("this.ready : " + this.readyState);
            console.log("this.status : " + this.status);
        }
    };
    xhr.open("GET","assets/json/movieDatabase.json", true);
    xhr.send();
    while(moviesInfoList == null)
    {
        await sleep(500);
        //console.log("boucle")

    }
    console.log("chargement réussi v2");
}



// 4) MORE MOVIES LESS MOVIES FILTER BUTTON : SEBASTIEN

const movieClassName = "col-md-2"
const showingNumber=6;

//remove the CSS property display:"none"; from the CSS properties of each movie of the list
function show(listOfMovies)
{
    for(let movie of listOfMovies)
    {
        movie.style["display"]="";
    }
}

//add the CSS property display:"none"; to the CSS properties of each movie of the list
function hide(listOfMovies)
{
    for(let movie of listOfMovies)
    {
        movie.style["display"]="none";
    }
}

//two functions in one 
//if complementCondition is true we get only the movies that respect the filterName
//if complementCondition is false we get only the movies that don't respect the filterName
function filterMovies(filterName,moviesList, complementCondition)
{
    return moviesList.filter((element)=>
    {
        const img = element.getElementsByTagName("img")[0];
        const url=img.getAttribute("src");
        //src of images take the form ../../assets/stupidrepository/image_name.format and we want only the last term 
        const nameAndFormat =url.split("/").pop();
        // name of images take the form MOVIENAME-YEAR-GENRE.FORMAT
        // we remove the format and separate the three informations in an array 
        const nameGenreYear = nameAndFormat.split(".").shift().split("-");
        const movieGenre=nameGenreYear[2];
        const movieYear=nameGenreYear[1];

        //filterName should be a genre or a year
        //we check if it correspond to the year or the genre of each movie 
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

//two functions in one 
//if complementCondition is true we get only the movies that respect the filterName
//if complementCondition is false we get only the movies that don't respect the filterName
function filterYearMovies(filterYearStart,filterYearEnd,moviesList, complementCondition)
{
    return moviesList.filter((element)=>
    {
        const img = element.getElementsByTagName("img")[0];
        const url=img.getAttribute("src");
        //src of images take the form ../../assets/stupidrepository/image_name.format and we want only the last term 
        const nameAndFormat =url.split("/").pop();
        // name of images take the form MOVIENAME-YEAR-GENRE.FORMAT
        // we remove the format and separate the three informations in an array 
        const nameGenreYear = nameAndFormat.split(".").shift().split("-");
        const movieYear=nameGenreYear[1];

        
        //we check if it correspond to the span of years
        if(movieYear>=filterYearStart && movieYear<=filterYearEnd)
        {
            console.log("OK",url,movieYear,filterYearStart,filterYearEnd);
            return !complementCondition; 
        }
        console.log("NOT OK",url,movieYear,filterYearStart,filterYearEnd); 
        return complementCondition; 
    })
}

async function activateFilterButtons()
{
    const featuredMoviesSection = document.getElementById("featured-movies");

    //I prefer to use the methods of the array class
    //warning to never modify featuredMoviesList directly we should copy/clone it instead
    const featuredMoviesList = Array.from(featuredMoviesSection.getElementsByClassName(movieClassName));

    //movies displayed on the window
    let displayedMoviesList = featuredMoviesList;  
    //movies undisplayed on the window
    let undisplayedMoviesList = [];

    //movies that respect the actual filter (by default there is no filter)  
    let filteredMoviesList = featuredMoviesList;

    //this equality should always be respected in my code 
    //undisplayed movies + displayed movies = filtered movies

    //button that should be active to show what is filtered
    let activeButton = document.getElementById("boutonActif");

    console.log(featuredMoviesList,displayedMoviesList,undisplayedMoviesList)

    const buttonMore = document.getElementById("plusDeFilms");
    const buttonLess = document.getElementById("moinsDeFilms");
    const buttonAll= activeButton;

    //by default display only a limited number of movies
    undisplayedMoviesList=filteredMoviesList.filter((element,index) => index >= showingNumber);//index is one less
    displayedMoviesList=filteredMoviesList.filter((element,index) => index < showingNumber);
    hide(undisplayedMoviesList);
    //hiding the less movie button
    buttonLess.style["display"]="none";
    

    // I should take some time to simplify this
    // I was clearly too careful because I didn't know why 
    // some movies from the displayed list were not shown again after a filter
    // maybe the bug was caused by a forgotten let in a for of loop???? (corrected now)

    buttonMore.addEventListener("click",()=>
        {
            if(filteredMoviesList.length > showingNumber &&  displayedMoviesList.length <= showingNumber)
            {
                displayedMoviesList=filteredMoviesList;
                undisplayedMoviesList=[];
                hide(displayedMoviesList) // too careful maybe
                show(displayedMoviesList);
                console.log("activate more button",displayedMoviesList,undisplayedMoviesList)
                buttonMore.style["display"]="none";
                buttonLess.style["display"]="";
            }
            else
            {
                console.log("deactivate more button",displayedMoviesList,undisplayedMoviesList)
            }
        }

    )

    buttonLess.addEventListener("click",()=>
        {
            if(filteredMoviesList.length <= showingNumber || displayedMoviesList.length <= showingNumber)
            {
                console.log("deactivate less button",displayedMoviesList,undisplayedMoviesList)
            }
            else
            {
                undisplayedMoviesList=filteredMoviesList.filter((element,index) => index >= showingNumber);//index is one less
                displayedMoviesList=filteredMoviesList.filter((element,index) => index < showingNumber);
                show(undisplayedMoviesList); //too careful maybe
                hide(undisplayedMoviesList);
                console.log("activate less button",displayedMoviesList,undisplayedMoviesList)
                buttonMore.style["display"]="";
                buttonLess.style["display"]="none";
            }
        }

    )


    const filterButtonTable=document.getElementsByClassName("filter")
    for (let button of filterButtonTable)
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
                show(displayedMoviesList); //too careful maybe
                activeButton.classList.remove("active");
                buttonAll.classList.add("active");
                activeButton=buttonAll;
                buttonMore.style["display"]="";
                buttonLess.style["display"]="none";
                console.log("deactivate button ", activeButton.id);

            }
            else
            {
                filteredMoviesList=filterMovies(event.target.id, featuredMoviesList, false);
                const restOfMovies=filterMovies(event.target.id, featuredMoviesList, true);
                show(restOfMovies); //too careful maybe
                hide(restOfMovies);
                undisplayedMoviesList=filteredMoviesList.filter((element,index) => index >= showingNumber);//index is one less
                displayedMoviesList=filteredMoviesList.filter((element,index) => index < showingNumber);
                show(undisplayedMoviesList); //too careful maybe
                hide(undisplayedMoviesList);
                show(displayedMoviesList);
                console.log("filterone", filteredMoviesList,"filterreverse", restOfMovies)
                activeButton.classList.remove("active");
                button.classList.add("active");
                activeButton=button;
                buttonMore.style["display"]="";
                buttonLess.style["display"]="none";
                console.log("activate button ", activeButton.id);               
            }
            
            



        })
    }
    const filterYearButtonTable=document.getElementsByClassName("filterYear")
    for (let button of filterYearButtonTable)
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
                show(displayedMoviesList); //too careful maybe
                activeButton.classList.remove("active");
                buttonAll.classList.add("active");
                activeButton=buttonAll;
                buttonMore.style["display"]="";
                buttonLess.style["display"]="none";
                console.log("deactivate button ", activeButton.id);

            }
            else
            {
                const startYear=parseInt(event.target.id);
                const endYear=startYear+10;
                filteredMoviesList=filterYearMovies(startYear,endYear, featuredMoviesList, false);
                const restOfMovies=filterYearMovies(startYear,endYear, featuredMoviesList, true);
                show(restOfMovies); //too careful maybe
                hide(restOfMovies);
                undisplayedMoviesList=filteredMoviesList.filter((element,index) => index >= showingNumber);//index is one less
                displayedMoviesList=filteredMoviesList.filter((element,index) => index < showingNumber);
                show(undisplayedMoviesList); //too careful maybe
                hide(undisplayedMoviesList);
                show(displayedMoviesList);
                console.log("filterone", filteredMoviesList,"filterreverse", restOfMovies)
                activeButton.classList.remove("active");
                button.classList.add("active");
                activeButton=button;
                buttonMore.style["display"]="";
                buttonLess.style["display"]="none";
                console.log("activate button ", activeButton.id);               
            }
            
            



        })
    }
    featuredMoviesList.forEach((movie) => {

        const img = movie.getElementsByTagName("img")[0];
        const url = img.getAttribute("src");
        //parse the src of the image
        const nameAndFormat = url.split("/").pop();
        //console.log(nameAndFormat)
        const nameGenreYear= nameAndFormat.split(".").shift().split("-");
        //console.log(nameGenreYear);
        const movieName=nameGenreYear[0];

        img.addEventListener("click", 
        async()=>
        {
            //find movie in our database using the title
            let movieObject=null;
            for(let i=0;i<moviesInfoList.length;i++)
            {
                console.log(moviesInfoList[i].title.toLowerCase().replace(/\s+/g, ''));
                if(moviesInfoList[i].title.toLowerCase().replace(/\s+/g, '') == movieName.toLowerCase())
                {
                    movieObject=moviesInfoList[i];
                    break;
                }
            }
            //if the movie is not in our database we do nothing
            if(movieObject == null)
            {
            
                console.log("pas de film au nom de :",movieName);
                return "";
            }

            //create a modal section
            const newModal = document.createElement("section");
            const closeButton = document.createElement("button");
            /*.modal class in bootstrap
                position: fixed;
                top: 0;
                left: 0;
                z-index: $zindex-modal;
                display: none; //this is the problem
                width: 100%;
                height: 100%;
                overflow: hidden;
            */ 
            newModal.style["position"]="fixed";
            newModal.style["top"]="12.5%";
            newModal.style["left"]="12.5%";
            newModal.style["z-index"]="2000";
            newModal.style["width"]="75%";
            newModal.style["height"]="75%";
            newModal.style["overflow"]="auto";
            newModal.style["display"]="flex";
            newModal.style["justify-content"]="center";
            newModal.style["flex-direction"]="column";
            newModal.style["text-align"]="center";
            newModal.style["background-color"]="white";

            body.style["overflow"]="hidden";

            closeButton.innerHTML="Fermer";
            closeButton.classList.add("btn");
            closeButton.classList.add("btn-danger");
            closeButton.classList.add("col-2");
            closeButton.classList.add("offset-5");
            closeButton.addEventListener("click", ()=>
            {
                newModal.style["display"]="none";
                body.removeChild(newModal);
                body.style["overflow"]="";
            })

            /*autoplay version*/
            /*newModal.innerHTML+="<iframe width=\"100%\" height=\"640\" src=\"https://www.youtube.com/embed/"
            +movieObject.youtubeID
            +"\"?rel=0&amp;controls=0&amp;showinfo=0;autoplay=1\""
            +" frameborder=\"0\" allow=\"accelerometer; autoplay=1; encrypted-media; gyroscope;" 
            +" picture-in-picture\" allowfullscreen></iframe>"*/
            
            newModal.innerHTML+="<iframe width=\"100%\" height=\"640\" src=\"https://www.youtube.com/embed/"
            +movieObject.trailerURL
            +"\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; " 
            +"gyroscope; picture-in-picture\" allowfullscreen></iframe>" 
            
            newModal.innerHTML+='<p>Titre : '+movieObject.title+'</p>'
            newModal.innerHTML+='<p>Genre : '+movieObject.genre+'</p>'
            newModal.innerHTML+='<p>Année : '+movieObject.year+'</p>'
            newModal.innerHTML+='<p>Réalisateur : '+movieObject.director+'</p>'
            newModal.innerHTML+='<h4>Acteurs</h4>'
            for(let i=0;i<movieObject.actors.length;i++)
            {
                newModal.innerHTML+='<p>'+movieObject.actors[i]+'</p>'

            }
            newModal.id="Modalimage"+movieName;
            newModal.appendChild(closeButton);
            body.insertBefore(newModal,body.firstChild);

            /*  
                modal animation found on the web
                opacity: 0;
                transform: scale(1.1);
                transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s; 
                opacity: 1;
                transform: scale(1.0);
                transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
            */
            newModal.style["opacity"]="0";
            newModal.style["transform"]="scale(1.1)";
            newModal.style["transition"]="visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s";
            await sleep(100);
            newModal.style["opacity"]="1";
            newModal.style["transform"]="scale(1.0)";
            newModal.style["transition"]="visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s";

        })

    }) 

}


// 5) CONTACT US LOG IN REGISTER FORMS : MAUD
async function activateFormsButtons()
{
    let env = document.querySelector("#send");
    let formi = document.querySelector("#myFormi");
    let closeBi = document.querySelector(".closebi");
    let b4 = document.querySelector(".btn4");
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
    b4.addEventListener("click", closeForm1);
    
    //form connect and register
    
    let modal = document.querySelector(".modal5");
    let closeButton = document.querySelector(".close-button");
    let b1 = document.querySelector(".btn1");
    let closeB = document.querySelector(".closeb");
    let b3 = document.querySelector(".btn3");
    let id1 = document.querySelector('#id01');
    let form = document.querySelector("#myForm");
    let log = document.querySelector("#login1");
    let reg = document.querySelector("#register1");
    
    
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
    log.addEventListener("click", toggleM2);
    reg.addEventListener("click", toggleM);
    b1.addEventListener("click", closeForm2);
    closeB.addEventListener("click", closeForm);
    closeButton.addEventListener("click", closeForm2);
    b3.addEventListener("click", redirect);
    
} 

// 6) SHOP MOVIES BUTTON : SEBASTIEN

async function activateShopMovie()
{
    //maybe specify the number of movies of one slide in a constant 
    const detailsBox = document.getElementById("shopMovieDetails");
    const trailerBox = document.getElementById("videoTrailerContainer");
    const titleBox = detailsBox.children[0];
    const synopsisBox = detailsBox.children[1];
    const yearBox = detailsBox.children[2];
    const genreBox = detailsBox.children[3];
    const priceBox = detailsBox.children[4];
    const shopMovieElement = document.getElementById("shopMoviesList");
    console.log(shopMovieElement);
    const shopMoviesList=shopMovieElement.getElementsByClassName("col-md-3");
    for(movie of shopMoviesList)
    {
        const title = movie.getElementsByClassName("card-title")[0];
        const img = movie.getElementsByTagName("IMG")[0];
        const both = [];
        both.push(title);
        both.push(img);
        const url = img.getAttribute("src");
        //parse the src of the image
        const nameAndFormat = url.split("/").pop();
        //console.log(nameAndFormat)
        const nameGenreYear= nameAndFormat.split(".").shift().split("-");
        //console.log(nameGenreYear);
        const movieName=nameGenreYear[0];
        //find movie in our database using the title
        let movieObject=null;

        console.log(title,img,"both",both,url,nameAndFormat,nameGenreYear,movieName,movieObject)
        for(let i=0;i<moviesInfoList.length;i++)
        {
            console.log(moviesInfoList[i].title.toLowerCase().replace(/\s+/g, ''));
            if(moviesInfoList[i].title.toLowerCase().replace(/\s+/g, '') == movieName.toLowerCase())
            {
                
                movieObject=moviesInfoList[i];
                break;
            }
        }
        
        
        for(let i=0;i<2;i++)
        {
            //if the movie is not in our database we complete the details at the best of our knowledge
            if(movieObject == null)
            {
                both[i].addEventListener("click", ()=>
                {
                    console.log("testNOTOK");
                    titleBox.innerHTML = "?";
                    synopsisBox.innerHTML = "?";
                    yearBox.innerHTML = "?";
                    genreBox.innerHTML = "?"
                    priceBox.innerHTML = "5€";
                    //a video about the top of rated movies on imdb
                    trailerBox.innerHTML="<iframe width=\"100%\" height=\"640\" src=\"https://www.youtube.com/embed/"
                    +"TDeW0NFwHkw"
                    +"\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; " 
                    +"gyroscope; picture-in-picture\" allowfullscreen></iframe>" 
                })
                console.log("pas de film au nom de :",movieName);
            }
            else
            {
                both[i].addEventListener("click", ()=>
                {
                    console.log("testOK");
                    titleBox.innerHTML = movieObject.title;
                    synopsisBox.innerHTML = movieObject.description;
                    yearBox.innerHTML = movieObject.year;
                    genreBox.innerHTML = movieObject.genre;
                    priceBox.innerHTML = "5€";
                    trailerBox.innerHTML="<iframe width=\"100%\" height=\"640\" src=\"https://www.youtube.com/embed/"
                    +movieObject.trailerURL
                    +"\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; " 
                    +"gyroscope; picture-in-picture\" allowfullscreen></iframe>" 
                })


            }
            
        }

   }  
    const scrollingLeft=document.getElementById("left-scrolling");
    const scrollingRight=document.getElementById("right-scrolling");

    let currentMovie = shopMoviesList[0];
    let currentIndex = 0;
    const shopMovieLength = shopMoviesList.length;
    const img = currentMovie.getElementsByTagName("IMG")[0];
    const url = img.getAttribute("src");
    //parse the src of the image
    const nameAndFormat = url.split("/").pop();
    //console.log(nameAndFormat)
    const nameGenreYear= nameAndFormat.split(".").shift().split("-");
    //console.log(nameGenreYear);
    const movieName=nameGenreYear[0];
    let movieObject=null;
    for(let i=0;i<moviesInfoList.length;i++)
    {
        console.log(moviesInfoList[i].title.toLowerCase().replace(/\s+/g, ''));
        if(moviesInfoList[i].title.toLowerCase().replace(/\s+/g, '') == movieName.toLowerCase())
        {   
            movieObject=moviesInfoList[i];
            break;
        }
    }
    changeDetails(movieObject);
    function changeDetails(movie)
    {
        const img = currentMovie.getElementsByTagName("IMG")[0];
        const url = img.getAttribute("src");
        //parse the src of the image
        const nameAndFormat = url.split("/").pop();
        //console.log(nameAndFormat)
        const nameGenreYear= nameAndFormat.split(".").shift().split("-");
        //console.log(nameGenreYear);
        const movieName=nameGenreYear[0];
        let movieObject=null;
        for(let i=0;i<moviesInfoList.length;i++)
        {
            console.log(moviesInfoList[i].title.toLowerCase().replace(/\s+/g, ''));
            if(moviesInfoList[i].title.toLowerCase().replace(/\s+/g, '') == movieName.toLowerCase())
            {   
                movieObject=moviesInfoList[i];
                break;
            }
        }
        if(movieObject==null)
        {
            console.log("testNOTOK");
            titleBox.innerHTML = "?";
            synopsisBox.innerHTML = "?";
            yearBox.innerHTML = "?";
            genreBox.innerHTML = "?"
            priceBox.innerHTML = "5€";
            //a video about the top of rated movies on imdb
            trailerBox.innerHTML="<iframe width=\"100%\" height=\"640\" src=\"https://www.youtube.com/embed/"
            +"TDeW0NFwHkw"
            +"\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; " 
            +"gyroscope; picture-in-picture\" allowfullscreen></iframe>" 
        }
        else
        {
            titleBox.innerHTML = movieObject.title;
            synopsisBox.innerHTML = movieObject.description;
            yearBox.innerHTML = movieObject.year;
            genreBox.innerHTML = movieObject.genre
            priceBox.innerHTML = "5€";
            trailerBox.innerHTML="<iframe width=\"100%\" height=\"640\" src=\"https://www.youtube.com/embed/"
            +movieObject.trailerURL
            +"\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; " 
            +"gyroscope; picture-in-picture\" allowfullscreen></iframe>" 
        }
        
    }
    console.log(scrollingLeft,scrollingRight);
    scrollingLeft.addEventListener("click",()=>
        {
            currentIndex=(shopMovieLength + currentIndex-1)%shopMovieLength;
            currentMovie=shopMoviesList[currentIndex];
            changeDetails(currentMovie);
            console.log(currentIndex,currentMovie);
        }
    );
    scrollingRight.addEventListener("click",()=>
        {
            currentIndex=(currentIndex+1)%shopMovieLength;
            currentMovie=shopMoviesList[currentIndex];
            changeDetails(currentMovie);
            console.log(currentIndex,currentMovie);
        }
    );

}


//7) LAUNCH EVERYTHING ONE BY ONE
async function main()
{
    //display(body,0);
    await ageRestrictionBox();
    console.log("Demande de l'age terminée \o/")
    //await cookieBox()
    console.log("Cookie box chargée \o/")
    await initArrowButtons()
    console.log("Boutons de défilement chargés \o/")
    await loadJSON();
    console.log("JSON chargé \o/")
    await activateFilterButtons();
    console.log("Filtres activés modal disponibles \o/")
    //await activateFormsButtons();
    console.log("Formulaires chargés \o/")
    await activateShopMovie();
    console.log("defilement du shop movie opérationel \o/")
    console.log("Site chargé, installez vous confortablement")
}
main();

/*
    - Copyright -
    Made by Maud Barbier, Ludovic Lambinon, Maxim Lopez & Sébastien Parmentier
*/