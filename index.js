const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname + '/views'));

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
];

let index = 0;
let battutaGiorno = battute[index];

setInterval(() => {
    index = (index+1) % battute.length;
    battutaGiorno = battute[index];
}
,1000 // ogni giorno cambia
*60
*60
*24
);

function homeRouter(req, res) {
    res.render('index', {
        battuta:battutaGiorno
    });
}

app.get('/', homeRouter);

app.listen(7778);
console.log('Server is listening on port '+7778);