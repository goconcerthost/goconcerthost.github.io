var glowchecked = true;


function updategradient() {
    gradient1 = document.getElementById('gradient1').value;
    gradient2 = document.getElementById('gradient2').value;

    document.getElementById('gradient-display').style.background = "linear-gradient(90deg,"+gradient1+","+gradient2+")";

    updateBlob();

}


function updateLooping() {
    looping = document.getElementById('looping').value;


    if (looping == "100" || looping == 100){
        document.getElementById('looping-display').innerHTML = "Infinite";
    }
    else {
        document.getElementById('looping-display').innerHTML = looping;
    }

    updateBlob();
    

}


function updateGlow() {
    glow = document.getElementById('glow').value;


    if (glow == "0" || glow == 0){
        document.getElementById('glowing-display').innerHTML = "No";
    }
    else {
        document.getElementById('glowing-display').innerHTML = glow;
    }

    updateBlob();
    

}



function updateBlob() {
    blob = "";
    var lines = document.getElementById('blob-data').value.split('\n');
    for(var i = 0;i < lines.length;i++){
        if (lines[i] != "" || lines[i] != null){
            blob += lines[i] + "\n";
        }
    }

    for(var i = 0;i < lines.length;i++){
        if (lines[i] != "" || lines[i] != null){
            blob += lines[i] + "\n";
            i = lines.length;
        }
    }

    gradient1 = document.getElementById('gradient1').value;
    gradient2 = document.getElementById('gradient2').value;

    glow = document.getElementById('glow').value;

    looping = document.getElementById('looping').value;
    loops = null;

    if (looping == "100" || looping == 100){
        loops = "indefinite";
    }
    else {
        loops = looping;
    }
    duration = document.getElementById('duration').value;


    var final = null
    if (glow == "0" || glow == 0){
        final = `
<div class="blobl">
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="20rem" id="blobSvg">
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color: `+gradient1+`;"></stop>
            <stop offset="100%" style="stop-color: `+gradient2+`;"></stop>
            </linearGradient>
        </defs>
        <path fill="url(#gradient)">
            <animate attributeName="d"
            dur="`+duration+`s"
            repeatCount="`+loops+`"
            values="
            `+blob+`
            "></animate>
        </path>
    </svg>
</div>
        `;
    }
    else {
        
        final = `
<style>
    .blobl:nth-child(2) {
        filter: blur(`+glow+`px);
        position: absolute;
    }
</style>
<div class="blobl">
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="20rem" id="blobSvg">
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color: `+gradient1+`;"></stop>
            <stop offset="100%" style="stop-color: `+gradient2+`;"></stop>
            </linearGradient>
        </defs>
        <path fill="url(#gradient)">
            <animate attributeName="d"
            dur="`+duration+`s"
            repeatCount="`+loops+`"
            values="
            `+blob+`
            "></animate>
        </path>
    </svg>
</div>

<div class="blobl">
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="20rem" id="blobSvg">
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color: `+gradient1+`;"></stop>
            <stop offset="100%" style="stop-color: `+gradient2+`;"></stop>
            </linearGradient>
        </defs>
        <path fill="url(#gradient)">
            <animate attributeName="d"
            dur="`+duration+`s"
            repeatCount="`+loops+`"
            values="
            `+blob+`
            "></animate>
        </path>
    </svg>
</div>

        `;
    }
    document.getElementById('blob-display').innerHTML = final;
    document.getElementById('code-display').innerText = final;

    




}


function toggleCode(){
    if (document.getElementById('code-copy').style.transform == "none"){
        document.getElementById('code-copy').style.transform = "translateX(200%)";
    }
    else {
        document.getElementById('code-copy').style.transform = "none";
    }
}

window.onload = function(){

    document.getElementById('code-copy').style.opacity = "0";
    

}


