var fs = require('fs');
var https = require('https');

const privateKey  = fs.readFileSync('private.key', 'utf8');
const certificate = fs.readFileSync('certificate.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const express = require('express');
const webpush = require('web-push');
//body-parser
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.json());
const httpsServer = https.createServer(credentials, app);

const publicVapidKey = 'BLnPSJ4Mo8jqt1Val4REZghr9t97y8it212h95KRqbsTd3GYvy8h9LZevluL-FokOrNDRnuhQdQT8rtqQJQgeAU';
const privateVapidKey = 'lkJiqg439TQI__PidvFDQrtOgCRJ87_H9kk1zO9nwYA';

//setting vapid keys details
webpush.setVapidDetails('mailto:luigi.gesuele98@gmail.com', publicVapidKey,privateVapidKey);

let immaginiGiorno = [];

fs.readdirSync('./views/images/buongiorno',{withFileTypes: true})
.filter(item => !item.isDirectory())
.map(item => immaginiGiorno.push(item.name));
//immaginiGiorno.push(file);

const battute = [
    {
        "text" : "Sai perché un pomodoro non attraversa mai la strada? Perché è rosso!",
        "author" : "Luiggi",
        "color" : "border-left: .25rem solid #50a748; border-top: 1px solid #50a748;border-bottom: 1px solid #50a748;border-right: 1px solid #50a748;"
    },
    {
        "text" : "Qual è la marca sportiva che tiene sempre tutto in ordine? La Fila!",
        "author" : "Leti",
        "color" : "border-left: .25rem solid purple; border-top: 1px solid purple;border-bottom: 1px solid purple;border-right: 1px solid purple;"
    },
    {
        "text" : "Una mia amica ha subito un aborto. Da quel giorno, non ride più alle mie battute... qualcuno le ha tolto il bambino che era in lei...",
        "author" : "Jack",
        "color" : "border-left: .25rem solid yellow; border-top: 1px solid yellow;border-bottom: 1px solid yellow;border-right: 1px solid yellow;"
    },
    {
        "text" : "Sai perché quando uno ha una delusione d'amore deve andare in Giappone? Perché Kyoto scaccia Kyoto!",
        "author" : "Jack",
        "color" : "border-left: .25rem solid yellow; border-top: 1px solid yellow;border-bottom: 1px solid yellow;border-right: 1px solid yellow;"
    },
    {
        "text" : "Sai qual è la città d'Italia dove si va per fare caso alle cose? Noto!",
        "author" : "Jack",
        "color" : "border-left: .25rem solid yellow; border-top: 1px solid yellow;border-bottom: 1px solid yellow;border-right: 1px solid yellow;"
    },
    {
        "text" : "Sai perché un'arancia non fa mai la spesa? Perché ci manda-rino!",
        "author" : "Luiggi",
        "color" : "border-left: .25rem solid #50a748; border-top: 1px solid #50a748;border-bottom: 1px solid #50a748;border-right: 1px solid #50a748;"
    },
    {
        "text" : "Credo che l'induzione sia riccia... sono tutti a dargli le piastre!",
        "author" : "Leti",
        "color" : "border-left: .25rem solid purple; border-top: 1px solid purple;border-bottom: 1px solid purple;border-right: 1px solid purple;"
    },
    {
        "text" : "Sai qual è il cane più cattivo? La can-aglia!",
        "author" : "Luiggi",
        "color" : "border-left: .25rem solid #50a748; border-top: 1px solid #50a748;border-bottom: 1px solid #50a748;border-right: 1px solid #50a748;"
    },
    {
        "text" : "Sai a chi devi chiedere tra tutte le spezie quando non sai qualcosa? A-lloro!",
        "author" : "Leti",
        "color" : "border-left: .25rem solid purple; border-top: 1px solid purple;border-bottom: 1px solid purple;border-right: 1px solid purple;"
    },
    {
        "text" : "Mi scusi, per andare al cimitero dove devo prendere l'autobus? In faccia!",
        "author" : "Luiggi",
        "color" : "border-left: .25rem solid #50a748; border-top: 1px solid #50a748;border-bottom: 1px solid #50a748;border-right: 1px solid #50a748;"
    },
    {
        "text" : "Sai qual è il social network più leggero? Insta-gram!",
        "author" : "Leti",
        "color" : "border-left: .25rem solid purple; border-top: 1px solid purple;border-bottom: 1px solid purple;border-right: 1px solid purple;"
    },
    {
        "text" : "Sai perché il sugo non attraversa mai la strada? perché è già passato!",
        "author" : "Luiggi",
        "color" : "border-left: .25rem solid #50a748; border-top: 1px solid #50a748;border-bottom: 1px solid #50a748;border-right: 1px solid #50a748;"
    },
    {
        "text" : "Per fare i maglioni di acqua, servono le persone a cui piace l'acqua: gli idrofili!",
        "author" : "Leti",
        "color" : "border-left: .25rem solid purple; border-top: 1px solid purple;border-bottom: 1px solid purple;border-right: 1px solid purple;"
    },
    {
        "text" : "Se tua madre si chiama Maria, non puoi fare lo 007... perché chi fa la spia, non è figlio di Maria!",
        "author" : "Jack",
        "color" : "border-left: .25rem solid yellow; border-top: 1px solid yellow;border-bottom: 1px solid yellow;border-right: 1px solid yellow;"
    },
    {
        "text" : "Sai perché i cani hanno paura delle luci? Perché abbagliano!",
        "author" : "Luiggi",
        "color" : "border-left: .25rem solid #50a748; border-top: 1px solid #50a748;border-bottom: 1px solid #50a748;border-right: 1px solid #50a748;"
    },
    {
        "text" : "La città dove si digerisce meglio? Bei Rutt!",
        "author" : "Jack",
        "color" : "border-left: .25rem solid yellow; border-top: 1px solid yellow;border-bottom: 1px solid yellow;border-right: 1px solid yellow;"
    },
    {
        "text" : "Sai cosa fa un ginocchio in discesa? Rotula!",
        "author" : "Luiggi",
        "color" : "border-left: .25rem solid #50a748; border-top: 1px solid #50a748;border-bottom: 1px solid #50a748;border-right: 1px solid #50a748;"
    },
    {
        "text" : "Se ti fai male in bagno devi comunque chiamare l'ambulanza, anche se i sanitari sono già sul posto!",
        "author" : "Jack",
        "color" : "border-left: .25rem solid yellow; border-top: 1px solid yellow;border-bottom: 1px solid yellow;border-right: 1px solid yellow;"
    },
    {
        "text" : "Se non ti sei stancato, sappi che ho ancora tante battute in serbo... e alcune anche in croato!",
        "author" : "Luiggi",
        "color" : "border-left: .25rem solid #50a748; border-top: 1px solid #50a748;border-bottom: 1px solid #50a748;border-right: 1px solid #50a748;"
    },
    {
        "text" : "Stavo con una strabica, ma non ha funzionato... avevamo punti di vista diversi!",
        "author" : "Jack",
        "color" : "border-left: .25rem solid yellow; border-top: 1px solid yellow;border-bottom: 1px solid yellow;border-right: 1px solid yellow;"
    },
    {
        "text" : `Io e te abbiamo molte cose in comune... ma quando andiamo a prenderle?`,
        "author" : "Luiggi",
        "color" : "border-left: .25rem solid #50a748; border-top: 1px solid #50a748;border-bottom: 1px solid #50a748;border-right: 1px solid #50a748;"
    },
    {
        "text" : "Il gestore della Q8 si ritira, sono quotto!",
        "author" : "Leti",
        "color" : "border-left: .25rem solid purple; border-top: 1px solid purple;border-bottom: 1px solid purple;border-right: 1px solid purple;"
    },
    // speciale halloween index 22
    {
        "text" : "Uno zombie entra in un alimentari: 'Scusate, posso avere un panino con la MORTA-della?'",
        "author" : "Jack",
        "color" : "border-left: .25rem solid orange; border-top: 1px solid orange;border-bottom: 1px solid orange;border-right: 1px solid orange;"
    },
    {
        "text" : "Sai perché le prede preferite dai vampiri non sono molto intelligenti? Perché buon sangue non mente!",
        "author" : "Luiggi",
        "color" : "border-left: .25rem solid #50a748; border-top: 1px solid #50a748;border-bottom: 1px solid #50a748;border-right: 1px solid #50a748;"
    },
    {
        "text" : "Se un cavallo si suicida si ippica?",
        "author" : "Leti",
        "color" : "border-left: .25rem solid purple; border-top: 1px solid purple;border-bottom: 1px solid purple;border-right: 1px solid purple;"
    },
    {
        "text" : "Sai perché gli atleti più spiritosi sono quelli che giocano a pallavolo? Perché hanno sempre la battuta pronta!",
        "author" : "Luiggi",
        "color" : "border-left: .25rem solid #50a748; border-top: 1px solid #50a748;border-bottom: 1px solid #50a748;border-right: 1px solid #50a748;"
    },
    {
        "text" : "Dato che oggi c'è il sole dovrò andare al SERT... perché devo stendere il bucato!",
        "author" : "Luiggi",
        "color" : "border-left: .25rem solid #50a748; border-top: 1px solid #50a748;border-bottom: 1px solid #50a748;border-right: 1px solid #50a748;"
    },
];

let index = 21;
let imgIndex = 21;
let battutaGiorno = battute[index];
let immagineGiorno = immaginiGiorno[imgIndex];
let current_time = null;
let subscription;
 //create paylod: specified the detals of the push notification
const payload = JSON.stringify({title: 'Ecco la nuova battuta del giorno!' });
setInterval(() => {
    if((new Date()).getHours() == 9){
        index = (index+1) % battute.length;
        imgIndex = (imgIndex+1) % immaginiGiorno.length;
        battutaGiorno = battute[index];
        immagineGiorno = immaginiGiorno[imgIndex];
        console.log(index);
        webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
    }
}
,1000 // ogni ora controllo se sono le 9
*60
*60
);

function homeRouter(req, res) {
    res.render('index', {
        battuta:battutaGiorno,
        immagine:immagineGiorno
    });
}

function getBattuta(req,res){
    res.json(battutaGiorno);
}

function paintRouter(req,res){
    res.render('paint');
}

app.get('/', homeRouter);
app.get('/get-battuta', getBattuta);

app.post('/subscribe', (req, res)=>{
    //get push subscription object from the request
    subscription = req.body;

    //send status 201 for the request
    res.status(201).json({})

    // Quando si apre l'app per la prima volta non serve inviare la notifica: questa verrà inviata ogni giorno.
    //webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
});

// Route per la pagina di paint
app.get('/paint',paintRouter);

// app.listen(443);
// console.log('Server is listening on port '+443);
var server = https.createServer(credentials, app);

server.listen(443, () => {
  console.log("server starting on port : " + 443)
});