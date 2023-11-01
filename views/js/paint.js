	// SETTING ALL VARIABLES

    var isMouseDown=false;
    var canvas = document.createElement('canvas');
    canvas.classList.add('text-center');
    var body = document.getElementsByTagName("body")[0];
    let container = document.getElementById("container");
    var ctx = canvas.getContext('2d');
    var linesArray = [];
    currentSize = 5;
    let oldSize = currentSize;
    var currentColor = "rgb(20,200,80)";
    let oldColor = currentColor;
    var currentBg = "white";

    // INITIAL LAUNCH
    setTimeout(createCanvas,1500);
    //createCanvas();

    // BUTTON EVENT HANDLERS

    document.getElementById('colorpicker').addEventListener('change', function() {
        currentColor = this.value;
        document.getElementById('painter').style.backgroundColor = this.value;
    });
    document.getElementById('bgcolorpicker').addEventListener('change', function() {
        ctx.fillStyle = this.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        redraw();
        currentBg = ctx.fillStyle;
    });
    document.getElementById('controlSize').addEventListener('change', function() {
        currentSize = this.value;
    });
    document.getElementById('saveToImage').addEventListener('click', function() {
        downloadCanvas(this, 'canvas', 'battutebelle_MasterPiece.png');
    }, false);
    document.getElementById('eraser').addEventListener('click', eraser);
    document.getElementById('painter').addEventListener('click', paint);

    // MICHAEL KEATON!
    document.getElementById('opera').addEventListener('click',drawKeaton);

    function drawKeaton(){
        let bgImg = new Image();
        bgImg.src = '/images/keaton.jpg';
        bgImg.onload = () => {
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        }
    }

    // REDRAW 

    function redraw() {
            for (var i = 1; i < linesArray.length; i++) {
                ctx.beginPath();
                ctx.moveTo(linesArray[i-1].x, linesArray[i-1].y);
                ctx.lineWidth  = linesArray[i].size;
                ctx.lineCap = "round";
                ctx.strokeStyle = linesArray[i].color;
                ctx.lineTo(linesArray[i].x, linesArray[i].y);
                ctx.stroke();
            }
    }

    // DRAWING EVENT HANDLERS

    canvas.addEventListener('mousedown', function() {mousedown(canvas, event);});
    canvas.addEventListener('mousemove',function() {mousemove(canvas, event);});
    canvas.addEventListener('mouseup',mouseup);

    // MOBILE
    canvas.addEventListener('touchstart', function() {touchdown(canvas, event);});
    canvas.addEventListener('touchmove',function() {touchmove(canvas, event);});
    canvas.addEventListener('touchend',touchup);

    // CREATE CANVAS

    function createCanvas() {
        canvas.id = "canvas";
        canvas.width = 320;
        canvas.height = 500;
        canvas.style.zIndex = 8;
        canvas.style.margin = "3%";
        canvas.style.border = "1px solid";
        canvas.style.touchAction = "none";
        ctx.fillStyle = currentBg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        container.appendChild(canvas);
    }

    // DOWNLOAD CANVAS

    function downloadCanvas(link, canvas, filename) {
        link.href = document.getElementById(canvas).toDataURL();
        link.download = filename;
    }

    // SAVE FUNCTION

    function save() {
        localStorage.removeItem("savedCanvas");
        localStorage.setItem("savedCanvas", JSON.stringify(linesArray));
        console.log("Saved canvas!");
    }

    // LOAD FUNCTION

    function load() {
        if (localStorage.getItem("savedCanvas") != null) {
            linesArray = JSON.parse(localStorage.savedCanvas);
            var lines = JSON.parse(localStorage.getItem("savedCanvas"));
            for (var i = 1; i < lines.length; i++) {
                ctx.beginPath();
                ctx.moveTo(linesArray[i-1].x, linesArray[i-1].y);
                ctx.lineWidth  = linesArray[i].size;
                ctx.lineCap = "round";
                ctx.strokeStyle = linesArray[i].color;
                ctx.lineTo(linesArray[i].x, linesArray[i].y);
                ctx.stroke();
            }
            console.log("Canvas loaded.");
        }
        else {
            console.log("No canvas in memory!");
        }
    }

    // ERASER HANDLING

    function eraser() {
        oldSize = currentSize;
        currentSize = 50;
        oldColor = currentColor;
        currentColor = ctx.fillStyle;
        document.getElementById('eraser').style.border = "solid 1px black";
        document.getElementById('painter').style.border = "0px";

    }

    // paint again
    function paint() {
        currentSize = oldSize;
        currentColor = oldColor;
        document.getElementById('eraser').style.border = "0px";
        document.getElementById('painter').style.border = "solid 1px black";
    }

    // GET MOUSE POSITION

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function getTouchPos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.touches[0].clientX - rect.left,
            y: evt.touches[0].clientY - rect.top
        };
    }

    // ON MOUSE DOWN

    function mousedown(canvas, evt) {
        var mousePos = getMousePos(canvas, evt);
        isMouseDown=true
        var currentPosition = getMousePos(canvas, evt);
        ctx.moveTo(currentPosition.x, currentPosition.y)
        ctx.beginPath();
        ctx.lineWidth  = currentSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = currentColor;

    }

    function touchdown(canvas, evt) {
        var mousePos = getTouchPos(canvas, evt);
        isMouseDown=true
        var currentPosition = getTouchPos(canvas, evt);
        ctx.moveTo(currentPosition.x, currentPosition.y)
        ctx.beginPath();
        ctx.lineWidth  = currentSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = currentColor;

    }

    // ON MOUSE MOVE

    function mousemove(canvas, evt) {

        if(isMouseDown){
            var currentPosition = getMousePos(canvas, evt);
            ctx.lineTo(currentPosition.x, currentPosition.y)
            ctx.stroke();
            store(currentPosition.x, currentPosition.y, currentSize, currentColor);
        }
    }

    function touchmove(canvas, evt) {

        if(isMouseDown){
            var currentPosition = getTouchPos(canvas, evt);
            ctx.lineTo(currentPosition.x, currentPosition.y)
            ctx.stroke();
            store(currentPosition.x, currentPosition.y, currentSize, currentColor);
        }
    }

    // STORE DATA

    function store(x, y, s, c) {
        var line = {
            "x": x,
            "y": y,
            "size": s,
            "color": c
        }
        linesArray.push(line);
    }

    // ON MOUSE UP

    function mouseup() {
        isMouseDown=false;
        store();
    }

    function touchup() {
        isMouseDown=false;
        store();
    }