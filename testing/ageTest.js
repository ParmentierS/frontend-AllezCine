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
    buttonNo.addEventListener("click",async ()=>
        {
            //trolling mode activated
            ageBox.style["display"]="none";
            const sectionVideo = document.createElement("section");
            sectionVideo.innerHTML="<iframe width=\"100%\" height=\"640\" src=\"https://www.youtube.com/embed/3xYXUeSmb-Y?rel=0&amp;controls=0&amp;showinfo=0;autoplay=1\""
            +" frameborder=\"0\" allow=\"accelerometer; autoplay=1; encrypted-media; gyroscope;" 
            +" picture-in-picture\" allowfullscreen></iframe>"
            document.body.append(sectionVideo);

            //<iframe width="560" height="315" src="https://www.youtube.com/embed/3xYXUeSmb-Y" frameborder="0" 
            //allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            /*const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            await firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            await sleep(2000)
            console.log(document.body.children);
            function onYouTubeIframeAPIReady() 
            {
                const player = new YT.Player('ageBox',
                {
                    height: '360',
                    width: '640',
                    videoId: '3xYXUeSmb-Y',
                    events: 
                    {
                        'onReady': onPlayerReady,
                        'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
                        'onStateChange': onPlayerStateChange,
                        'onError': onPlayerError
                    }
                });
                document.body.append(player);
                console.log(document.body.children);
            }
            function onPlayerReady(event) 
            {
                event.target.setVolume(100);
                event.target.playVideo();
            }
        
              // 5. The API calls this function when the player's state changes.
              //    The function indicates that when playing a video (state=1),
              //    the player should play for six seconds and then stop.
            let done = false;
            function onPlayerStateChange(event) 
            {
                if (event.data == YT.PlayerState.PLAYING && !done) 
                {
                    setTimeout(stopVideo, 8000);
                    done = true;
                }
            }
            function stopVideo() 
            {
                player.stopVideo();
            }*/
        
            await sleep(10000);

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