const body = document.body;
async function main()
{
    const movieClassName = "col-3"
    const showingNumber=3;

    function sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function createCSSSelector (selector, style)
    {
        let styleSheetElement = document.createElement('style');
        styleSheetElement.type = 'text/css';
        console.log(styleSheetElement);
        console.log(styleSheetElement.sheet);
        document.getElementsByTagName('head')[0].appendChild(styleSheetElement);
        styleSheetElement.sheet.insertRule(selector + '{' + style + '}',0);
        console.log(styleSheetElement);

    } 
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
        xhr.open("GET","movieDatabase.json", true);
        xhr.send();
        while(moviesInfoList == null)
        {
            await sleep(500);
            console.log("boucle")

        }
        console.log("chargement réussi v2");
    }

    await loadJSON();
    console.log("test après la fonction loadjson");

    const featuredMoviesSection = document.getElementById("featured-movies");
    const featuredMoviesList = Array.from(featuredMoviesSection.getElementsByClassName(movieClassName));
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
                if(moviesInfoList[i].title.toLowerCase() == movieName)
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
            
            newModal.innerHTML+="<iframe width=\"100%\" height=\"640\" src=\"https://www.youtube.com/embed/"
            +movieObject.youtubeID
            +"?rel=0&amp;controls=0&amp;showinfo=0;autoplay=1\""
            +" frameborder=\"0\" allow=\"accelerometer; autoplay=1; encrypted-media; gyroscope;" 
            +" picture-in-picture\" allowfullscreen></iframe>"
            
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
main();


async function test()
{
    /*for(let i = 0; i<100 ; i++)
    {
        await sleep(1000);
        hide(displayedMoviesList);
        undisplayedMoviesList=displayedMoviesList;
        displayedMoviesList=[];
        await sleep(1000);
        show(undisplayedMoviesList);
        displayedMoviesList=undisplayedMoviesList;
        undisplayedMoviesList=[];
    }*/

    console.log("test",displayedMoviesList,undisplayedMoviesList)
    /*for(let i = 0; i<10000 ; i++)
    {
        await sleep(1000);
        hide(displayedMoviesList);
        undisplayedMoviesList = undisplayedMoviesList.concat(displayedMoviesList);
        console.log("after hide",displayedMoviesList,undisplayedMoviesList)
        displayedMoviesList=[];
        await sleep(1000);
        show(undisplayedMoviesList);
        displayedMoviesList = displayedMoviesList.concat(undisplayedMoviesList);
        console.log("after show",displayedMoviesList,undisplayedMoviesList)
        undisplayedMoviesList=[];
    }*/
    
    /*if(displayedMoviesList.length >showingNumber)
    {
        for(let i = 0; i<100 ; i++)
        {
            await sleep(1000);
            undisplayedMoviesList=displayedMoviesList.filter((element,index) => index >= showingNumber);
            displayedMoviesList=displayedMoviesList.filter((element,index) => index < showingNumber);
            hide(undisplayedMoviesList);
            await sleep(1000);
            displayedMoviesList=featuredMoviesList;
            undisplayedMoviesList=[];
            show(displayedMoviesList);
        }
    }*/
    

}




