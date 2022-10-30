function titleCase(str) {
    str = str.toString()
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getConnectionStatus() {
    return navigator.onLine
}

function print(e){
    console.log(e)
}


function nId(id){
    return document.getElementById(id)
}

function nO(url){
    window.open(url);
}

var fullscreen = false;
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}


function toggleFullScreen(){
    if (fullscreen){
        closeFullscreen()
    }
    else {
        openFullscreen()
    }

    fullscreen = !fullscreen;
}



function failNotif(msg, delay){
    nId('fail-text').innerHTML = msg;
    nId('fail-display').classList.add('active');
    setTimeout(function(){
        nId('fail-display').classList.remove('active');
    },parseInt(delay));
}

function successNotif(msg, delay){
    nId('success-text').innerHTML = msg;
    nId('success-display').classList.add('active');
    setTimeout(function(){
        nId('success-display').classList.remove('active');
    },parseInt(delay));
}

function sleep(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

function setLoadStatus(status){
    if (status.includes('complete')){
        nId("loadstatus").innerText = status + "!";

    }
    else {
        nId("loadstatus").innerText = status + "...";

    }
}



function nFetch(theUrl)
{	
    try{
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return JSON.parse(xmlHttp.responseText);
    }
    catch(err) {
        return {'OK':false,'resp':'The API is unreachable.','code':"N0"}
    }
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

function removeElement(elementId) {
    var element = document. getElementById(elementId);
    element. parentNode. removeChild(element);
}

function removeObjectFromList(list, object){
    list.splice(list.indexOf(object), 1);

    //to remove the last element
    return list;
}

function unicodeToChar(text) {
    return text.replace(/\\u[\dA-F]{4}/gi, function(match) {
        return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });
}

function anyFetch(theUrl)
{	
    try{
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return JSON.parse(xmlHttp.responseText);
    }
    catch(err) {
        return {'OK':false,'resp':'No internet connection or something went wrong on the server side.','code':"N0"}
    }
}

function nPreloaderFinish(msg = "complete") {
    setLoadStatus(msg);
    $('#preloader img').css('opacity', '0');
    $('.check > div').css('animation', 'revealcheck .7s ease-in-out forwards').delay(600);
    $('#preloader').delay(1550).fadeOut('slow');
    $('body').delay(1050).css({'overflow':'visible'});
}



// NITLIXPRO.JS IS THE OFFICIAL PRIMARY LIBRARY FOR ANY OF THE NITLIX APPS
// FALLS FULLY UNDER COPYRIGHT OF NITLIX S.T. AND GO! SERVICES
console.log("NitlixPro.js initiated 🚀")