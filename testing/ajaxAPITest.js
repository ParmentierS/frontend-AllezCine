
function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
function ajax1()
{
    const req = new XMLHttpRequest();
    let quotealacon ="NULL";
    req.onload= function()
    {

        if (this.readyState == 4 && this.status == 200) 
        {
            console.log("chargement réussi");
            quotealacon = JSON.parse(this.responseText);
            let quote = document.querySelector("#quote");
            console.log(quotealacon);
            if(quotealacon.gender =="m")
            {
                quote.innerHTML = "<h1>RANDOM QUOTE</h1><p><b>"+quotealacon.quote+ "</b></p>"
                +"<p>"+"Auteur : "+quotealacon.author + "</p>"
                +"<img src=\""+quotealacon.photo+"\" alt=\"photo du gars\" >"
                +"<p><a href=\""+quotealacon.permalink+"\">Lien vers la citation</a></p>"
                +"<p> Nombre de citations du gars : "+quotealacon.total_quotes+ "</p>" ;
            }
            else if(quotealacon.gender =="f")
            {
                quote.innerHTML = "<h1>RANDOM QUOTE</h1><p><b>"+quotealacon.quote+ "</b></p>"
                +"<p>"+"Auteur : "+quotealacon.author + "</p>"
                +"<img src=\""+quotealacon.photo+"\" alt=\"photo de la dame\" >"
                +"<p><a href=\""+quotealacon.permalink+"\">Lien vers la citation</a></p>"
                +"<p> Nombre de citations de la dame : "+quotealacon.total_quotes+ "</p>" ;
            }
            else
            {
                quote.innerHTML = "<h1>RANDOM QUOTE</h1><p><b>"+quotealacon.quote+ "</b></p>"
                +"<p>"+"Auteur : "+quotealacon.author + "</p>"
                +"<img src=\""+quotealacon.photo+"\" alt=\"photo de l'alien\" >"
                +"<p><a href=\""+quotealacon.permalink+"\">Lien vers la citation</a></p>"
                +"<p> Nombre de citations de l'alien' : "+quotealacon.total_quotes+ "</p>" ;
            }
        }
        else{
            console.log("Même pas foutu de charger un truc correctement")
            console.log("this.ready : "+this.readyState);
            console.log("this.status : "+this.status);

        }
    };
    req.open("GET","https://thatsthespir.it/api", true);
    req.send();
}
function ajax2(requestWebsite) 
{
    const req2 = new XMLHttpRequest();
    let filmalacon ="NULL";
    req2.onload = function()
    {

        if (this.readyState == 4 && this.status == 200) 
        {
            console.log("chargement réussi");
            filmalacon = JSON.parse(this.responseText);
            let quote = document.querySelector("#quote");
            console.log("mon film",filmalacon);
            /*if(quotealacon.gender =="m")
            {
                quote.innerHTML = "<h1>RANDOM QUOTE</h1><p><b>"+quotealacon.quote+ "</b></p>"
                +"<p>"+"Auteur : "+quotealacon.author + "</p>"
                +"<img src=\""+quotealacon.photo+"\" alt=\"photo du gars\" >"
                +"<p><a href=\""+quotealacon.permalink+"\">Lien vers la citation</a></p>"
                +"<p> Nombre de citations du gars : "+quotealacon.total_quotes+ "</p>" ;
            }
            else if(quotealacon.gender =="f")
            {
                quote.innerHTML = "<h1>RANDOM QUOTE</h1><p><b>"+quotealacon.quote+ "</b></p>"
                +"<p>"+"Auteur : "+quotealacon.author + "</p>"
                +"<img src=\""+quotealacon.photo+"\" alt=\"photo de la dame\" >"
                +"<p><a href=\""+quotealacon.permalink+"\">Lien vers la citation</a></p>"
                +"<p> Nombre de citations de la dame : "+quotealacon.total_quotes+ "</p>" ;
            }
            else
            {
                quote.innerHTML = "<h1>RANDOM QUOTE</h1><p><b>"+quotealacon.quote+ "</b></p>"
                +"<p>"+"Auteur : "+quotealacon.author + "</p>"
                +"<img src=\""+quotealacon.photo+"\" alt=\"photo de l'alien\" >"
                +"<p><a href=\""+quotealacon.permalink+"\">Lien vers la citation</a></p>"
                +"<p> Nombre de citations de l'alien' : "+quotealacon.total_quotes+ "</p>" ;
            }*/
        }
        else{
            console.log("Même pas foutu de charger un truc correctement")
            console.log("this.ready : "+this.readyState);
            console.log("this.status : "+this.status);

        }
    };
    //req2.withCredentials=true;
    req2.open("GET","https://api.themoviedb.org/3/search/movie?api_key=c09c36444f5f7892c0b86bed2e830338&language=en-US&query=Inception&page=1&include_adult=false", true);
    req2.send();
}
let moviesInfoList=[];
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
    
}
async function main()
{
    loadJSON()
    /*ajax1();
    for(let i=0;i<10;i++)
    {
        await sleep(10000);
        ajax2("https://api.themoviedb.org/3/search/movie?api_key=c09c36444f5f7892c0b86bed2e830338&language=en-US&query=Inception&page=1&include_adult=false");
    }*/
    

}
main();



