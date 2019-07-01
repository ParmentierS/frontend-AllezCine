const shopMoviesList=document.getElementById("shopmovieslist").getElementsByClassName("col-md-3");
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



