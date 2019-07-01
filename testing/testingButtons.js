const movieClassName = "col-3"
const showingNumber=3;

function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
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
test();



