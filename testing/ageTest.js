function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function init()
{
    //body hides
    document.body.style["opacity"]=0;

    //getting dom elements
    const ageBox = document.getElementsByClassName("ageBox")[0];
    const buttonYes = document.getElementsByClassName("yes")[0];
    const buttonNo = document.getElementsByClassName("no")[0];

    //everything should disappear
    const jumbotronTable = document.getElementsByClassName("jumbotron")
    for(jumbotron of jumbotronTable)
    {
        jumbotron.style["display"]="none";
    }
    const footer = document.getElementsByTagName("footer")[0];
    const cookieBox = document.getElementsByClassName("cookieBox")[0];
    footer.style["display"]="none";
    cookieBox.style["display"]="none";

    //showing body again
    document.body.style["opacity"]=1;

    //setting 2 event listeners for yes and no button
    let clicked = false;
    buttonNo.addEventListener("click",()=>
        {
            window.location.replace("https://www.imdb.com/");
            //testing to use it or not
            clicked=true;  
            document.body.style["display"]="none";
        }
    )
    buttonYes.addEventListener("click",()=>
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
    cookieBox.style["display"]="";
    for(jumbotron of jumbotronTable)
    {
        jumbotron.style["display"]="";
    }
    footer.style["display"]="";    
    console.log(cookieBox)
}

async function main()
{
    await init();
    /*maud code*/

    let modal = document.querySelectorAll(".modal")[1];
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

main();