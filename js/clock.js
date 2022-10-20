var loaded = false;
var ready = false;

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

var mobile = detectMob();



function imageloaded(){
    loaded = true;
}




function nclockswitch(sw){
    if (localStorage.getItem(sw) == 'on'){
        localStorage.setItem(sw, 'off');
    }
    else {
        localStorage.setItem(sw, 'on');
    }
    window.scrollTo(0,0);
}

var setup = false;



function reloadswitch(sw, r1 = null, r2 = null){
    if (localStorage.getItem(sw) == 'on'){
        localStorage.setItem(sw, 'off');
    }
    else {
        localStorage.setItem(sw, 'on');
    }
    localStorage.setItem(r1, 'off');
    localStorage.setItem(r2, 'off');
    window.location.reload(); 
}


window.onload = function(){
    
    
    if (localStorage.getItem('ndisplay-timer') == null){
        localStorage.setItem('ndisplay-timer', 'off');
        setup = true;
        
    }

    if (localStorage.getItem('ndisplay-stopw') == null){
        localStorage.setItem('ndisplay-stopw', 'off');
    }
    if (localStorage.getItem('nitlix-clock-wallaper') == null){
        localStorage.setItem('nitlix-clock-wallaper', 'f');
    }
    if (localStorage.getItem('nitlix-ampm') == null){
        localStorage.setItem('nitlix-ampm', 'off');
    }
    if (localStorage.getItem('ndisplay-nclock2') == null){
        localStorage.setItem('ndisplay-nclock2', 'on');
    }
    if (localStorage.getItem('ndisplay-nclock3') == null){
        localStorage.setItem('ndisplay-nclock3', 'on');
    }
    if (localStorage.getItem('nitlix-clock-wallaper') == 'a'){
        document.getElementById('clock-img').src = "img/nixis/wallapers/hotairbaloon.jpg";
    }
    if (localStorage.getItem('nitlix-clock-wallaper') == 'b'){
        document.getElementById('clock-img').src = "img/nixis/wallapers/galaxy.jpg";
    }
    if (localStorage.getItem('nitlix-clock-wallaper') == 'c'){
        document.getElementById('clock-img').src = "img/nixis/wallapers/island.jpg";
    }
    if (localStorage.getItem('nitlix-clock-wallaper') == 'd'){
        document.getElementById('clock-img').src = "img/nixis/wallapers/beach.jpg";
    }
    if (localStorage.getItem('nitlix-clock-wallaper') == 'e'){
        document.getElementById('clock-img').src = "img/nixis/wallapers/sunset.jpg";
    }
    if (localStorage.getItem('nitlix-clock-wallaper') == 'f'){
        const image = 'https://source.unsplash.com/3840x2160/?landscape,nature,water';
        if (!getConnectionStatus()){
            failNotif('No internet connection. Cannot set wallpaper to Random.',2500)
            localStorage.setItem('nitlix-clock-wallaper', 'a');
            document.getElementById('clock-img').src = "img/nixis/wallapers/hotairbaloon.jpg";
        }
        else {
            document.getElementById('clock-img').src = `${image}`;
            document.getElementById('random-display').style.backgroundImage = `url(${image})`;
        }


    }
    if (localStorage.getItem("nitlix-ampm") == 'on'){
        document.getElementById('ampm-switch').checked = true;
    }
    if (localStorage.getItem("ndisplay-nclock2") == 'on'){
        document.getElementById('date-switch').checked = true;
    }
    if (localStorage.getItem("ndisplay-nclock3") == 'on'){
        document.getElementById('zone-switch').checked = true;
    }
    if (localStorage.getItem("ndisplay-timer") == 'on'){
        document.getElementById('timer-switch').checked = true;
    }
    if (localStorage.getItem("ndisplay-stopw") == 'on'){
        document.getElementById('stopw-switch').checked = true;
    }
    if (localStorage.getItem('ndisplay-timer') == 'on'){
        document.getElementById('timerinput').style.display = "flex";
        document.getElementById('nclock2').innerHTML = "Timer";
        document.getElementById('nclock2').style.fontFamily = "Poppins";
        document.getElementById('nclock2').style.marginTop = "20px;";
        document.getElementById('timerstopwbutton').style.display = "flex";
        document.getElementById('timerclear').style.display = "flex";
    }
    else {
        if (localStorage.getItem('ndisplay-stopw') == 'on'){
            document.getElementById('nclock2').innerHTML = "Stopwatch";
            document.getElementById('nclock2').style.fontFamily = "Poppins";
            document.getElementById('nclock3').innerHTML = "Please keep your tab open.";
            document.getElementById('stopw').style.display = "flex";
            document.getElementById('stopwbutton').style.display = "flex";
            document.getElementById('stopwclear').style.display = "flex";
        }
    }

    ready = true;
    var waitforload = setInterval(function(){
        if (loaded){
            
            
            
            setTimeout(function(){
                window.scrollTo(0,0);
                AOS.init({
                    once: true
                });
                
                
                //document.getElementById('ziml').style.transform = "rotate(-90deg)";
                //document.getElementById('zim').style.maxWidth = document.getElementById('zim').scrollWidth + "px";
                
                
                
                setTimeout(function(){
                    
                    loadFooter()    
                    nPreloaderFinish()
                    
                    if (setup) {
                        successNotif('Welcome to nClock',5000)
                    }

                },2000)
            },500)
            clearInterval(waitforload);
        }
        
    },100)
    

    
    
















}


function walto(jk){
    localStorage.setItem('nitlix-clock-wallaper', jk) 
    location.reload();
}

setInterval(function(){
    
    var top = window.pageYOffset;
    if (top < 30){
        document.getElementById('clock').style.height = window.innerHeight + "px";
        document.getElementById('clock-img').style.height = window.innerHeight + "px";
        window.scrollTo(0,0)
    }
}, 500);


var emain = setInterval(function(){
    if (ready && (localStorage.getItem('ndisplay-stopw') == 'off' && localStorage.getItem('ndisplay-timer') == 'off')){
        var d = new Date();
        var m = d.getMinutes();
        var h = d.getHours();
        var s = d.getSeconds();
        var dy = d.getDate();
        var mn = d.getMonth() + 1;
        var fy = d.getFullYear();
        var to = d.getTimezoneOffset();
        mm = m.toString();
        hh = h.toString();
        ss = s.toString();
        
        if (ss.length == 1){
            ss = "0" + ss;
        }
        if (mm.length == 1){
            mm = "0" + mm;
        }
        dys = dy.toString();
        mns = mn.toString();
        if (dys.length == 1){
            dys = "0" + dys;
        }
        if (mns == "1"){
            mns = " of January";
        }
        if (mns == "2"){
            mns = " of February";
        }
        if (mns == "3"){
            mns = " of March";
        }
        if (mns == "4"){
            mns = " of April";
        }
        if (mns == "5"){
            mns = " of May";
        }
        if (mns == "6"){
            mns = " of June";
        }
        if (mns == "7"){
            mns = " of July";
        }
        if (mns == "8"){
            mns = " of August";
        }
        if (mns == "9"){
            mns = " of September";
        }
        if (mns == "10"){
            mns = " of October";
        }
        if (mns == "11"){
            mns = " of November";
        }
        if (mns == "12"){
            mns = " of December";
        }
        if (dy > 3 && dy != 21 && dy != 22 && dy != 23 && dy != 31){
            dys = dys + "th";
        }
        else {
            if (dys == "3" || dys == "23") {
                dys = dys + "rd";
            }
            else {
                if (dys == "2" || dys == "22") {
                    dys = dys + "nd";
                }
                else {
                    dys = dys + "st";
                }
            }
        }
        
        if (localStorage.getItem('nitlix-ampm') == 'on'){
            var ampmmod = false;
            if (hh == "0" || hh == "00") {
                hh = 12;
            }
            else {
                switch(hh){
                    case "23":
                        hh = 11;
                        ampmmod = true;
                    case "22":
                        hh = 10;
                        ampmmod = true;
                    case "21":
                        hh = 9;
                        ampmmod = true;
                    case "20":
                        hh = 8;
                        ampmmod = true;
                    case "19":
                        hh = 7;
                        ampmmod = true;
                    case "18":
                        hh = 6;
                        ampmmod = true;
                    case "17":
                        hh = 5;
                        ampmmod = true;
                    case "16":
                        hh = 4;
                        ampmmod = true;
                    case "15":
                        hh = 3;
                        ampmmod = true;
                    case "14":
                        hh = 2;
                        ampmmod = true;
                    case "13":
                        hh = 1;
                        ampmmod = true;
                    case "12":
                        hh = 12;
                        ampmmod = true;

                }

            }

        
            if (ampmmod){
                document.getElementById("nclock1").innerHTML = hh + ":" + mm + ":" + ss + "PM";
                document.title = hh + ":" + mm + ":" + ss + "PM";
            }
            else {
                document.getElementById("nclock1").innerHTML = hh + ":" + mm + ":" + ss + "AM";
                document.title = hh + ":" + mm + ":" + ss + "AM";
            }
        }
        else {
            if (hh.length == 1){
                hh = "0" + hh;
            }
            document.getElementById("nclock1").innerHTML = hh + ":" + mm + ":" + ss;
            document.title = hh + ":" + mm + ":" + ss;
        }

        if (localStorage.getItem('ndisplay-nclock2') == 'on') {
            document.getElementById("nclock2").innerHTML = dys + mns + " " + fy;
        }
        else {
            document.getElementById("nclock2").innerHTML = null;
        }

        if (localStorage.getItem('ndisplay-nclock3') == 'on'){

            if(to <= 0){
                document.getElementById("nclock3").innerHTML = "Timezone: UTC+" + (-(to/60));
            }
            else {
                document.getElementById("nclock3").innerHTML = "Timezone: UTC" + (-(to/60));
            }
        }
        else {
            document.getElementById("nclock3").innerHTML = null;
        }
        
    

    }
    else {
        if (!localStorage.getItem('ndisplay-stopw') == 'off' && localStorage.getItem('ndisplay-timer') == 'off'){
            clearInterval(emain)
        }
    }
        
}, 50);

if (localStorage.getItem('ndisplay-timer') == 'on'){
    var alarm = new Audio("sounds/nixis/timer-done.mp3");
    var running = false;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var secs = 0;
    var tempsec = 0;
    function ignorenull(v, multiplication = 1){
        if (document.getElementById(v).value == null){
            return 0;
        }
        else {
            return document.getElementById(v).value * multiplication;
        }

    }   
    function splitsec(sec){
        tempsec = sec;
        hours = Math.floor(sec/3600);
        tempsec = tempsec - hours * 3600;
        minutes = Math.floor(tempsec/60);
        tempsec = tempsec - minutes * 60;
        seconds = tempsec;
    }
    function timerclear(){
        sec = 0;
        tempsec = 0;
        splitsec(sec);
        clearInterval(timer);
        document.getElementById('ntimer1').value = hours;
        document.getElementById('ntimer2').value = minutes;
        document.getElementById('ntimer3').value = seconds;
        document.getElementById('timerstopwbutton').innerHTML = "Start";
        document.title = hours + "h " + minutes + "m " + seconds + "s";
        running = false;
    }
    function timerswitch(){
        var secs = ignorenull('ntimer1', 3600) + ignorenull('ntimer2', 60) + ignorenull('ntimer3') - 1;
        if (running == false){
            document.getElementById('timerstopwbutton').innerHTML = "Stop";
            running = true;
            // 1st Time
            // Set Interval
            timer = setInterval(function(){
                if (secs != -1){
                    splitsec(secs);
                    secs = secs - 1;
                    document.getElementById('ntimer1').value = hours;
                    document.getElementById('ntimer2').value = minutes;
                    document.getElementById('ntimer3').value = seconds;
                    document.title = hours + "h " + minutes + "m " + seconds + "s";
                }
                else {
                    clearInterval(timer);
                    running = false;
                    alarm.play();
                    document.getElementById('timerstopwbutton').innerHTML = "Start";
                }
            }, 1000);
        }
        else {
            running = false;
            clearInterval(timer);
            document.getElementById('timerstopwbutton').innerHTML = "Resume";


        }

    }




}
if (localStorage.getItem('ndisplay-stopw') == 'on'){
    var runnings = false;
    var msec = 0;
    var minutes = 0;
    var seconds = 0;
    var ms = 0;
    var delay = 5;
    function updatestopw(){
        tempms = ms;
        minutess = Math.floor(tempms/60000);
        tempms = tempms - minutess * 60000;
        secondss = Math.floor(tempms/1000);
        tempms = tempms - secondss * 1000;
        msec = tempms;
        document.getElementById('nstopw1').value = minutess;
        document.getElementById('nstopw2').value = secondss;
        document.getElementById('nstopw3').value = msec;
        ms = ms + delay;
    }
    function stopwclear(){
        ms = 0;
        document.getElementById('stopwbutton').innerHTML = "Start";
        clearInterval(stopw);
        runnings = false;
        updatestopw();
    }
    function togglestopw(){
        if(runnings == false){
            runnings = true;
            document.getElementById('stopwbutton').innerHTML = "Stop";
            updatestopw();
            stopw = setInterval(function(){
                updatestopw();
            }, delay);
        }
        else {
            runnings = false;
            document.getElementById('stopwbutton').innerHTML = "Resume";
            clearInterval(stopw);
        }
    }







}
setInterval(function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    if (localStorage.getItem('ndisplay-stopw') == 'on'){

    }
}, 500);

console.log('clock.js Initiated 🚀')