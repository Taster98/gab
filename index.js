var fs = require('fs');
var https = require('https');
require('dotenv').config({ path: '.env' })
const privateKey  = fs.readFileSync('private.key', 'utf8');
const certificate = fs.readFileSync('certificate.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const battute = require('./battute.js').battute;

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

const publicVapidKey = process.env.VAPID_PUBLIC;
const privateVapidKey = process.env.VAPID_PRIVATE;

//setting vapid keys details
webpush.setVapidDetails(process.env.VAPID_MAIL, publicVapidKey,privateVapidKey);

let immaginiGiorno = [];

fs.readdirSync('./views/images/buongiorno',{withFileTypes: true})
.filter(item => !item.isDirectory())
.map(item => immaginiGiorno.push(item.name));
//immaginiGiorno.push(file);

let index = 23;
let imgIndex = 23;
let battutaGiorno = battute[index];
let immagineGiorno = immaginiGiorno[imgIndex];
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