/* Roba per le notifiche push */
const publicVapidKey = 'BLnPSJ4Mo8jqt1Val4REZghr9t97y8it212h95KRqbsTd3GYvy8h9LZevluL-FokOrNDRnuhQdQT8rtqQJQgeAU';

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
//check if the serveice worker can work in the current browser
setInterval(() => {
    if('serviceWorker' in navigator){
        send().catch(err => console.error(err));
    }
}, 1000*60*60*24);

//register the service worker, register our push api, send the notification
async function send(){
    //register service worker
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });

    try {
        //register push
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,

            //public vapid key
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });
    
        //Send push notification
        await fetch("/subscribe", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
                "content-type": "application/json"
            }
        });
    } catch (error) {
        console.log("Error", err);
    }

}

/* Fine roba per notifiche push */



/* Funzioni per condivisione battuta su WA o TG */
function sendImage(){
    let battuta = document.getElementById('text').innerText;
    battuta = battuta + `

https://battutebelle.ddns.net`;
    window.open('whatsapp://send?text='+encodeURIComponent(battuta),'_self');
}

function sendImageTg(){
    let battuta = document.getElementById('text').innerText;
    battuta = battuta + `

https://battutebelle.ddns.net`;
    window.open('tg://msg?text='+encodeURIComponent(battuta),'_self');
}

/* QUESTA NON E' IBIZA */
function isItIbiza(){
    if(i == 6){
        document.getElementById('logo').classList.remove('animate__animated');
        document.getElementById('logo').classList.remove('animate__tada');
        document.getElementById('logo').offsetWidth;
        document.getElementById('logo').classList.add('animate__animated');
        document.getElementById('logo').classList.add('animate__tada');

        document.getElementById('condividi').classList.remove('animate__animated');
        document.getElementById('condividi').classList.remove('animate__tada');
        document.getElementById('condividi').offsetWidth;
        document.getElementById('condividi').classList.add('animate__animated');
        document.getElementById('condividi').classList.add('animate__tada');

        document.getElementById('footer').classList.remove('animate__animated');
        document.getElementById('footer').classList.remove('animate__tada');
        document.getElementById('footer').offsetWidth;
        document.getElementById('footer').classList.add('animate__animated');
        document.getElementById('footer').classList.add('animate__tada');

        document.getElementById('gtitolo').classList.remove('animate__animated');
        document.getElementById('gtitolo').classList.remove('animate__tada');
        document.getElementById('gtitolo').offsetWidth;
        document.getElementById('gtitolo').classList.add('animate__animated');
        document.getElementById('gtitolo').classList.add('animate__tada');

        document.getElementById('gsubtitolo').classList.remove('animate__animated');
        document.getElementById('gsubtitolo').classList.remove('animate__tada');
        document.getElementById('gsubtitolo').offsetWidth;
        document.getElementById('gsubtitolo').classList.add('animate__animated');
        document.getElementById('gsubtitolo').classList.add('animate__tada');

        document.getElementById('testo').classList.remove('animate__animated');
        document.getElementById('testo').classList.remove('animate__tada');
        document.getElementById('testo').offsetWidth;
        document.getElementById('testo').classList.add('animate__animated');
        document.getElementById('testo').classList.add('animate__tada');

        document.getElementById('waButton').classList.remove('animate__animated');
        document.getElementById('waButton').classList.remove('animate__tada');
        document.getElementById('waButton').offsetWidth;
        document.getElementById('waButton').classList.add('animate__animated');
        document.getElementById('waButton').classList.add('animate__tada');

        document.getElementById('tgButton').classList.remove('animate__animated');
        document.getElementById('tgButton').classList.remove('animate__tada');
        document.getElementById('tgButton').offsetWidth;
        document.getElementById('tgButton').classList.add('animate__animated');
        document.getElementById('tgButton').classList.add('animate__tada');
        let a = new Audio('https://battutebelle.ddns.net/audio/azibi.mpeg');
        a.load();
        a.play();
    }
    document.getElementById('figure').classList.remove('animate__animated');
    document.getElementById('figure').classList.remove('animate__tada');
    document.getElementById('figure').classList.remove('animate__flip');

    document.getElementById('figure').offsetWidth;
    document.getElementById('figure').classList.add('animate__animated');
    document.getElementById('figure').classList.add('animate__tada');
    i = (i + 1) % 7;
}
let i = 0;

document.getElementById('logo').addEventListener('click', isItIbiza);


/* CHE BARBA E CHE NOIA */
let j = 1;
let parola1 = 'CHE BARBA!';
let parola2 = 'CHE NOIA!';
let batt = document.getElementById('text').innerText;

function cheBarba(){
    if(isAluin()){
        let a = new Audio('https://battutebelle.ddns.net/audio/aluin.mp3');
        a.load();
        a.play();
    }

    document.getElementById('figure').classList.remove('animate__animated');
    document.getElementById('figure').offsetWidth;
    j = (j+1)%10000000;
    if(j == 10){
        parola1 = "!ABRAB EHC";
        parola2 = "!AION EHC";
    }
    if(j%2==0){
        let aux = parola1;
        parola1=parola2;
        parola2=aux;
    }
    document.getElementById('text').innerText = j%2 == 0 ? parola1 : parola2;

    document.getElementById('figure').classList.add('animate__animated');
    document.getElementById('figure').classList.add('animate__flip');
    setTimeout(() => {
        document.getElementById('text').innerText = batt;
    }, 1250)
}
document.getElementById('figure').addEventListener('click', cheBarba);

/* Quanto manca a Natale? */
function christmas(){
    let today = new Date();
    let christmasYear = today.getFullYear();

    if (today.getMonth() == 11 && today.getDate() > 25) {
        christmasYear = christmasYear + 1;
    }

    let christmasDate = new Date(christmasYear, 11, 25);
    let dayMilliseconds = 1000 * 60 * 60 * 24;

    let remainingDays = Math.ceil(
    (christmasDate.getTime() - today.getTime()) /
    (dayMilliseconds)
    );
    
    let b = new Audio('https://battutebelle.ddns.net/audio/natale.mp3');
    b.load();
    b.play();
    document.getElementById('text').innerText = `Mancano ancora ${remainingDays} giorni a Natale!`;
    document.body.classList.add('snow');
    setTimeout(() => {
        document.getElementById('text').innerText = batt;
        document.body.classList.remove('snow');
    }, 7500);
}

function isChristmas(){
    return new Date().getMonth() == 11 && new Date().getDate() == 25;
}

function isXAgosto(){
    return new Date().getMonth() == 7 && new Date().getDate() == 10;
}

function isAluin(){
    return new Date().getMonth() == 9 && new Date().getDate() == 31;
}

/* AVE O MARIA */
function aveOMaria(){
    let a = new Audio('https://battutebelle.ddns.net/audio/maria.mp3');
    a.load();
    a.play();
}

let paintCounter = 0;
function viewPaint(){
    paintCounter = (paintCounter+1)%8;
    if(paintCounter == 7){
        window.open('/paint','_self');
    }
}
document.getElementById('a').addEventListener('click',viewPaint);

async function onLoad(){
    let response = await fetch("/get-battuta");
    response = await response.json();
    document.getElementById("text").innerText = response.text;
    document.getElementById("author").innerText = response.author;
    document.getElementById('figure').style = response.color;

    await send();

    if(isChristmas()){
        document.getElementById('text').innerText = `MERRY CHRISTMAS!`;
        document.body.classList.add('snow');
    }else{
        document.getElementById('text').innerText = batt;
        document.body.classList.remove('snow');
    }
    let autore = document.getElementById('author').innerText;
    if(isXAgosto()){
        document.getElementById('text').innerText = `[...] 	E tu, Cielo, dall'alto dei mondi
        sereni, infinito, immortale,
        oh! d'un pianto di stelle lo inondi
        quest'atomo opaco del Male!`;
        document.getElementById('author').innerText = `Fanciullino secsi`;
        document.getElementById('logo').removeEventListener('click', isItIbiza, true);
        document.getElementById('logo').addEventListener('click', aveOMaria);
    }else{
        document.getElementById('text').innerText = batt;
        document.getElementById('author').innerText = autore;
        document.getElementById('logo').removeEventListener('click', aveOMaria, true);
        document.getElementById('logo').addEventListener('click', isItIbiza);
    }
    console.log('prova');
    // Speciale halloween
    if(isAluin()){
        let div = `
        <div class="halloween">
        <div class="head">
            <div class="skull">
            <div class="eyes">
                <div class="eye eye-left"></div>
                <div class="eye eye-right"></div>
            </div>
            </div>
        </div>
        <div class="body"></div>
        <div class="legs"></div>
        </div>
        `;
        document.getElementById('block').innerHTML += div;
        console.log(div);
        document.getElementById('testo').classList.add('blood');
    }
}



const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))