var activesetting = "account";
var login_unfocus = true;

var sessionsinfo = [

];
var adminlogin = false;
var oldadmindata = {};
var admindata = {};
var editing = null;
var editid = null;
var rem = 16;
var password = null;
var sessiondisplaying = null;
var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var admin_suspicious_requests = false;
var admin_users = false;


//Custom right click menu
//document.onclick = hideMenu;
//document.oncontextmenu = rightClick;
//
//function hideMenu() {
//	nId(
//		"contextMenu").style.display = "none"
//}

//function rightClick(e) {
//	e.preventDefault();
//
//	if (nId(
//		"contextMenu").style.display == "block")
//		hideMenu();
//	else {
//		var menu = document
//			.getElementById("contextMenu")
//				
//		menu.style.display = 'block';
//		menu.style.left = e.pageX + "px";
//		menu.style.top = e.pageY + "px";
    //}
//}

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

function nId(id){
    return document.getElementById(id);
}

function getFormData(object) {
    var form_data = new FormData();

    for ( var key in object ) {
        form_data.append(key, object[key]);
    }

    return form_data
}

function nFetch(theUrl,args=false)
{	
    if (args != false){
        
        
        var fdata = getFormData(args)


        //nFetch("https://api.nitlix.pro/api/v1/accounts/login", {"user":'nit',"pass":'nit'})


        var body = null;
        $.ajax({
            url: "https://api.nitlix.pro/api/v1/accounts/login",
            type: "POST",
            data: fdata,
            success: function (msg) {
                body = msg
            },
            async:false,
            global: false,
            processData: false,
            contentType: false,
        });

        return body
    
    }
    else {
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

    return 'what'
    
}


setLoadStatus("functions");

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}


function failNotif(msg, delay){
    nId('fail-text').innerText = msg;
    nId('fail-display').classList.add('active');
    setTimeout(function(){
        nId('fail-display').classList.remove('active');
    },parseInt(delay));
}

function successNotif(msg, delay){
    nId('success-text').innerText = msg;
    nId('success-display').classList.add('active');
    setTimeout(function(){
        nId('success-display').classList.remove('active');
    },parseInt(delay));
}

function titleCase(str) {
    str = str.toString()
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function resetAccountMenu(){
    document.querySelectorAll('.sessions-flex')[0].innerHTML = "";
    sessionsinfo = []
    editing = null;
    password = null;
    adminlogin = false;
}


function showSetting(e){
    var coll = document.querySelectorAll(".account-settings-setting");
    nId(activesetting + '-button').classList.remove('active');
    activesetting = e;
    nId(activesetting + '-button').classList.add('active');
    for (i = 0; i < coll.length; i++) {
        try{
            coll[i].classList.remove('active');
        }
        catch(err){

        }
    }
    nId(e).classList.add('active');
}


function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; 
}



function showSession(){
    if (nId('sessionid').innerText == localStorage.getItem('account-session')){
        nId('sessionid').innerText = "";
    }
    else {
        nId('sessionid').innerText =  localStorage.getItem('account-session');
    }
}

function showPassword(){
    if (nId('password').innerText == password){
        nId('password').innerText = "";
    }
    else {
        nId('password').innerText = password;
    }
}

function toTwo(e){
    if (e.toString().length == 1){
        return "0" + e.toString();
    }
    else {
        return e.toString();
    }
}
function copySession(){
    navigator.clipboard.writeText(localStorage.getItem('account-session'));
    successNotif("Copied!",2500);
}

function edit(edit, editname, editt){
    editing = edit;
    editid = editt;
    nId('editing').innerText = editname;
    nId('edit-value').placeholder = "Type " + editname;
    nId('edit').style.transform = "none";
}

function colorLuminance(hex, lum) {
// Validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, "");
    if (hex.length < 6) {
    hex = hex.replace(/(.)/g, '$1$1');
    }
    lum = lum || 0;
    // Convert to decimal and change luminosity
    var rgb = "#",
    c;
    for (var i = 0; i < 3; ++i) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}




function cancelEdit(){
    nId('edit').style.transform = "translateY(200%)";
}

function confirmEdit(){
    value = nId('edit-value').value;

    if (editing == "colour"){
        value = value.replace('#', '');
    }

    if (nId('edit-pass').value == password){
        var data = nFetch("https://api.nitlix.pro/api/v1/accounts/edit", {"session":localStorage.getItem('account-session'),"parameter":editing,"value":value})
        if (data['OK']){
            successNotif(data['resp'],2500);
            nId(editid).innerText = value;
            cancelEdit();
        }
        else {
            failNotif(data['resp'],2500)
        }
    }
    else {
        failNotif("The password isn't correct :(",2500)
    }
    nId('edit').style.transform = "none";


    nId('edit-value').value = "";
}

function loginandGetSession(user=nId('logreg-nick').value,pass=nId('logreg-pass').value,namesurnameset=false){
    
    var data = nFetch("https://api.nitlix.pro/api/v1/accounts/login", {"user":user,"pass":pass})
    if (data['OK'] ){
        
        var r = document.querySelectorAll('.logregline');
        r[2].style.setProperty('background-color', '#1bd115');
        r[3].style.setProperty('background-color', '#1bd115');

        if (data['msg'].toString().includes('2FA')){
            authsession=data['resp'];
            successNotif(data['msg'],2500);
            est = true;
            fail = false;
            session = null;

            e = setInterval(function(){

                var data2 = nFetch("https://api.nitlix.pro/api/v1/accounts/mfa_check", {"authsession":authsession})
                console.log(data2)
                if (data2['msg'].includes('PASSED')){
                    session = data2['resp'];
                    successNotif("Logged in!",2500);
                    localStorage.setItem('account-session',session);


                    login(session);
                    if (!namesurnameset) {
                        nId('login').style.opacity = "0";
                        setTimeout(function(){
                            nId('login').style.display = "none";
                            r[0].style.setProperty('background-color', 'rgb(226, 226, 226);');
                            r[1].style.setProperty('background-color', 'rgb(226, 226, 226);');
                        },500);
                    }
                    clearInterval(e);

                }
                else {
                    if (!data['OK']){
                        failNotif("2FA Verification Expired. Please refresh the page and log in again.",2500);
                        fail = true;
                        clearInterval(e)
                    }
                    else {
                        successNotif("2FA Pending...",2500);
                    }
                }
            },5000);
        }


    

            

            



        else {
            setTimeout(() => {
                successNotif("Logged in!",2500);

                localStorage.setItem('account-session',data['resp']);

                
                login(localStorage.getItem('account-session'));

                if (!namesurnameset) {
                    nId('login').style.opacity = "0";
                    setTimeout(function(){
                        nId('login').style.display = "none";
                        r[0].style.setProperty('background-color', 'rgb(226, 226, 226);');
                        r[1].style.setProperty('background-color', 'rgb(226, 226, 226);');
                    },500);
                }
                
            }, 1500);
        }
        
        


        
    }
    else {
        failNotif(data['resp'],2500)
    }	


    
}

function registerRaw(){
    user = nId('logreg-nick').value;
    pass = nId('logreg-pass').value;
    if (user.length >= 1 && pass.length >= 1){
        var english = /^[A-Za-z0-9]*$/;

        if (english.test(pass.replace(/\s/g, '')) && english.test(user) && !pass.includes("&") && !user.includes("&")) {
            register(user,pass);
        }
        else {
            failNotif("Those can only include English letters and numbers :)",2500)
        }


    }
    else {
        failNotif("Did you leave something blank?",2500)
    }
}

function wait(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function register(user,pass){
    var data = nFetch("https://api.nitlix.pro/api/v1/accounts/register", {"user":user,"pass":pass})
        
    if (data['OK']){
        loginandGetSession(user,pass);
    }
    else {
        failNotif(data['resp'],2500)
    }
}

function login(session){
    resetAccountMenu();
    var data = nFetch("https://api.nitlix.pro/api/v1/accounts/login?include_sessions", {"session":localStorage.getItem('account-session')});
        if (data['OK']){
            resp = data['resp']

            nId('password').innerText = "";
            password = data["resp"]["pass"];
            nId('sessionid').innerText = "";
            nId('fullname').innerText = data['resp']['forename'] + " " + data['resp']['surname'];
            nId('forename').innerText = data['resp']['forename'];
            nId('surname').innerText = data['resp']['surname'];
            nId('colour').innerText = "#" + data['resp']['colour'];
            nId('email').innerText = data['resp']['email'];
            nId('nick').innerText = data['resp']['nick'];
            nId('avatar').innerText = data['resp']['avatar'];
            nId('id').innerText = data['resp']['id'];
            var r = document.querySelector(':root');
            r.style.setProperty('--account-color', "#" + resp['colour']);
            r.style.setProperty('--account-color-darker', colorLuminance("#" + resp['colour'],-0.3));




            sf = document.querySelectorAll('.sessions-flex')[0];
            sessionsinfo = data['resp']['sessionsInfo']


            var i = 0;
            for (i = 0; i < sessionsinfo.length; i++) {
                currentsession = sessionsinfo[i]
                if (currentsession['self'] == localStorage.getItem('account-session')){
                    sf.innerHTML += `
                <div class="session">
                    <div class="image-flex">
                        <div style="background-image: url('https://static-maps.yandex.ru/1.x/?lang=en_US&l=map&size=500,300&pt=`+currentsession["location"][0]["lon"]+`,`+currentsession["location"][0]["lat"]+`,round&spn=3,3'); object-fit: cover; background-position: center;background-size: cover;" class=session-image></div>
                        
                    </div>
                    <div class="moresinfo pointer" onClick="showMoreSession(`+i+`);">MORE INFO</div>
                    <div class="session-text">
                        <div class="data-flex" style="align-self: flex-end;">
                            <i class='bx bx-current-location' style="margin-right: .1rem;"></i>
                            <h1 class="slide-little" style="width: max-content">Location: </h1>
                            <img src="https://flagcdn.com/`+currentsession["location"][0]["countryCode"].toLowerCase()+`.svg" style="margin-left: .5rem; height: .5rem; border-radius: .1rem; box-shadow: 0px 0px .75rem rgba(255, 255, 255, 0.2);margin-right: .1rem;">
                            <span class="account-highlight slide-desc" style="font-size: .875rem;">`+currentsession["location"][0]["country"]+`</span>
                        </div>
                        <div class="data-flex" style="align-self: flex-end;">
                            <i class='bx bxs-devices' style="margin-right: .1rem;"></i>
                            <h1 class="slide-little" style="width: max-content; text-align: right;">Platform: <span class="account-highlight slide-desc" style="font-size: .875rem;">`+currentsession["platform"]+`</span></h1>

                        </div>
                        

                        <div class="data-flex" style="align-self: flex-end;">
                            <i class='bx bxl-chrome'  style="margin-right: .1rem;"></i>
                            <h1 class="slide-little" style="width: max-content; text-align: right;">Browser: <span class="account-highlight slide-desc" style="font-size: .875rem;">`+currentsession["browser"]+`</span></h1>
                        </div>

                        <div class="data-flex" style="align-self: flex-end; margin-top: .3rem;">
                            <i class='bx bxs-check-circle gradient-highlight'></i>
                            <h1 class="slide-desc" style="margin-left: .15rem; font-size: .9rem;">This device</h1>
                        </div>
                    </div>
                
                </div>`;
                }
                else {
                    sf.innerHTML += `
                <div class="session">
                    <div class="image-flex">
                        <div style="background-image: url('https://static-maps.yandex.ru/1.x/?lang=en_US&l=map&size=500,300&pt=`+currentsession["location"][0]["lon"]+`,`+currentsession["location"][0]["lat"]+`,round&spn=3,3'); object-fit: cover; background-position: center;background-size: cover;" class=session-image></div>
                        
                    </div>
                    <div class="moresinfo pointer" onClick="showMoreSession(`+i+`);">MORE INFO</div>
                    <div class="session-text">
                        <div class="data-flex" style="align-self: flex-end;">
                            <i class='bx bx-current-location' style="margin-right: .1rem;"></i>
                            <h1 class="slide-little" style="width: max-content">Location: </h1>
                            <img src="https://flagcdn.com/`+currentsession["location"][0]["countryCode"].toLowerCase()+`.svg" style="margin-left: .5rem; height: .5rem; border-radius: .1rem; box-shadow: 0px 0px .75rem rgba(255, 255, 255, 0.2);margin-right: .1rem;">
                            <span class="account-highlight slide-desc" style="font-size: .875rem;">`+currentsession["location"][0]["country"]+`</span>
                        </div>
                        <div class="data-flex" style="align-self: flex-end;">
                            <i class='bx bxs-devices' style="margin-right: .1rem;"></i>
                            <h1 class="slide-little" style="width: max-content; text-align: right;">Platform: <span class="account-highlight slide-desc" style="font-size: .875rem;">`+currentsession["platform"]+`</span></h1>

                        </div>
                        

                        <div class="data-flex" style="align-self: flex-end;">
                            <i class='bx bxl-chrome'  style="margin-right: .1rem;"></i>
                            <h1 class="slide-little" style="width: max-content; text-align: right;">Browser: <span class="account-highlight slide-desc" style="font-size: .875rem;">`+currentsession["browser"]+`</span></h1>
                        </div>
                    </div>
                
                </div>`;
                }

                    

                
            }

            checkAdmin();


        }
        else {
            if (data['code'] != "N0"){
                localStorage.removeItem('account-session');
                login_unfocus = true;
                nId('login').style.display = "grid";
                nId('login').style.opacity = "1";
            }

            else {

                failNotif(data['resp'],5000);
                nId('login').style.display = "grid";
                nId('login').style.opacity = "1";
            }
        }


}

function sessionSignOut(){
    var data = nFetch("https://api.nitlix.pro/api/v1/accounts/sessionsignout", {"session":sessionsinfo[sessiondisplaying]['self']})
    if (data['OK']){

        if (localStorage.getItem('account-session') == sessionsinfo[sessiondisplaying]['self']){
            successNotif("Signed out!",2500);
            localStorage.removeItem('account-session')
            nId('login').style.display = "grid";
            nId('login').style.opacity = "1";
            resetAccountMenu();
            login_unfocus = true;
            hideMoreSession();
        }
        else {
            successNotif(data['resp'],2500);
            resetAccountMenu();
            login(localStorage.getItem('account-session'));
            hideMoreSession();
        }

        
        
    
    }
    else {
        failNotif(data['resp'],2500)
    }
}

function showMoreSession(e){
    var e = parseInt(e);
    resp = sessionsinfo[e];

    var date = new Date(parseInt(resp["created"])*1000);

    var date = new Date(parseInt(parseInt(resp["created"])+parseInt(e))*1000);
    sessiondisplaying = e;
    nId('sessioninfo-created').innerText = toTwo(date.getDate()) + " " + months[date.getMonth()] + " " + date.getFullYear()
    nId('sessioninfo-platform').innerText = resp['platform']
    nId('sessioninfo-browser').innerText = resp['browser']
    nId('sessioninfo-ip').innerText = resp['ip']
    nId('sessioninfo-id').innerText = resp['self']
    nId('sessioninfo-user').innerText = resp['user']

    var sf = nId('sessionHistory');
    sf.innerHTML = `<div class="data-flex" style="align-self: flex-end;width: 100%; justify-content: center; align-items: center;">
        <i class="bx bx-current-location" style="margin-right: .1rem; font-size: 1.25rem;"></i>
        <h1 class="slide-title" style="width: max-content; font-size: 1.5rem;">Location History</h1>
    </div>
    <div style="height: 3rem;"></div>`;

    for (i = 0; i < resp['location'].length; i++) {
        var date = new Date(parseInt(resp["location"][i]['time'])*1000);
        

        e = -date.getTimezoneOffset()*60;


        
            sf.innerHTML += `
            <div class="session-line" style="margin-top: 1rem;">
            
        </div>

        <div class="session-locator">
            <div style="background-image: url('https://static-maps.yandex.ru/1.x/?lang=en_US&amp;l=map&amp;size=500,300&amp;pt=`+resp['location'][i]["lon"]+`,`+resp['location'][i]["lat"]+`,round&amp;spn=3,3'); object-fit: cover; background-position: center;background-size: cover; height: 10rem; aspect-ratio: .7; border-radius: 1rem 0 0 1rem;"></div>
                

                <div class="session-text" style="margin: .5rem 1rem .5rem 1rem;">

                    <div class="data-flex" style="align-self: flex-end;">
                        <i class="bx bxs-flag" style="margin-right: .1rem;"></i>
                        <h1 class="slide-little" style="width: max-content; text-align: right;">Country: <span class="account-highlight slide-desc" style="font-size: .875rem;"></span></h1>
                        <div class="data-flex" style="align-self: flex-end;">
                            <img src="https://flagcdn.com/`+resp['location'][i]["countryCode"].toLowerCase()+`.svg" style="margin-left: .5rem; height: .5rem; border-radius: .1rem; box-shadow: 0px 0px .75rem rgba(255, 255, 255, 0.2);margin-right: .1rem; margin-bottom: 0.1rem;">
                            <span class="account-highlight slide-desc" style="font-size: .875rem; line-height: .875rem;">`+resp['location'][i]["country"]+`</span>
                        </div>
                    </div>

                    <div class="data-flex" style="align-self: flex-end;">
                        <i class="bx bxs-city" style="margin-right: .1rem;"></i>
                        <h1 class="slide-little" style="width: max-content; text-align: right;">City: <span class="account-highlight slide-desc" style="font-size: .875rem;">`+resp['location'][i]["city"]+`</span></h1>

                    </div>

                    <div class="data-flex" style="align-self: flex-end;">
                        <i class="bx bxs-analyse" style="margin-right: .1rem;"></i>
                        <h1 class="slide-little" style="width: max-content; text-align: right;">IP Adress: <span class="account-highlight slide-desc" style="font-size: .875rem;">`+resp['location'][i]["query"]+`</span></h1>

                    </div>

                    <div class="data-flex" style="align-self: flex-end;">
                        <i class="bx bxs-map-alt" style="margin-right: .1rem; align-self: flex-start"></i>
                        <h1 class="slide-little" style="width: max-content; text-align: right;">Approx. Location: <br><span class="account-highlight slide-desc" style="font-size: .875rem;">`+resp['location'][i]["lat"]+`,`+resp['location'][i]["lon"]+`</span></h1>

                    </div>
                    

    

                    <h1 class="slide-desc" style="margin-left: .25rem; font-size: .9rem; color: var(--text-color-barely); width: max-content; text-align: right; align-self: flex-end; margin-top: 1rem;">` + toTwo(date.getHours()) + ':' + toTwo(date.getMinutes()) + ':' + toTwo(date.getSeconds()) + ' ' + toTwo(date.getDate()) + '/' + toTwo(date.getMonth()+1) + '/' + date.getFullYear() + `</h1>

                    
                </div>
                

        </div>`

        

    };
    if (resp["self"] == localStorage.getItem('account-session')){
        nId('sessioninfo-this').style.display = "flex";
        nId('sessioninfo-not-this').style.display = "none";
    }
    else {
        nId('sessioninfo-this').style.display = "none";
        nId('sessioninfo-not-this').style.display = "flex";
    }
    document.querySelectorAll('.session-line')[0].style.display = "none";


    nId('sessioninfo').style.transform = "none";
}

function hideMoreSession(){
    nId('sessioninfo').style.transform = "translateY(125%)";
}

function checkAdmin(){
    var data = nFetch('https://api.nitlix.pro/api/v1/admin?session=', {"session":localStorage.getItem('account-session'),"action":"check"})

    


    if (data['resp']){
        adminlogin = true;
        
    }
    else {
        nId('admin-button').remove()
        nId('admin').remove()
    }



}

function adminFunction(action){
    var data = nFetch('https://api.nitlix.pro/api/v1/admin?session=', {"session":localStorage.getItem('account-session'),"action":action});

    if (data['OK']){
        successNotif(data['resp'],2500);
    }
    else {
        failNotif(data['resp'],2500)
    }
}	


function admin_toggle_suspicious_requests(){
    if (admin_toggle_suspicious_requests){
        admin_toggle_suspicious_requests = false;
        nId('admin_toggle_suspicious_requests_button').innerText = "Enable";
    }
    else {
        admin_toggle_suspicious_requests = true;
        nId('admin_toggle_suspicious_requests_button').innerText = "Disable";
    }
}

function admin_toggle_users(){
    if (admin_users){
        admin_users = false;
        nId('admin_users_button').innerText = "Enable";
    }
    else {
        adminusers = true;
        nId('admin_users_button').innerText = "Disable";
    }
}



setLoadStatus("accounts");



window.onload=function(){

    
    rem = nitChangeScreen(true);
    showSetting('account');
    if (localStorage.getItem('account-session') == null){
        nId('login').style.display = "grid";
        nId('login').style.opacity = "1";
    }
    else {
        login_unfocus = false;
        login();
    }
    var coll = document.querySelectorAll(".menu-show");


    for (i = 0; i < coll.length; i++) {

        coll[i].addEventListener("click", function() {
            
            var content = nId("collapsible-menu");
            if (!content.classList.contains("collapsible-menu-show")){
                nId("collapsible-menu").classList.add("collapsible-menu-show");
            } else {
                nId("collapsible-menu").classList.remove("collapsible-menu-show");
            }
        });
    }
    
    window.addEventListener('resize', function(){
        rem = nitChangeScreen(true);
    });


    //Collapsible

    setLoadStatus("interface");





    
    
    
    setInterval(()=>{

        
        if (adminlogin){
            starttime = new Date().getTime()
            arglist = []

            if (admin_toggle_suspicious_requests){
                arglist.push('&return_suspicous_requests');
            }
            if (admin_toggle_users){
                arglist.push('&return_users');
            }

            argstr = "&"+arglist.join("")
            var data = nFetch('https://api.nitlix.pro/api/v1/admin', {"session":localStorage.getItem('account-session'),"action":"status"})

            if (data['OK']){
                endtime = new Date().getTime()

                ping = endtime-starttime

                prspeed = data['resp']['prspeedms']

                var pings;
                if (ping <= 250){
                    pings = 2;
                }
                else {
                    if (ping <= 1000){
                        pings = 1;
                    }
                    else {
                        pings = 0;
                    }
                }


                data['resp']['variables']['ping'] = [`${ping}ms [P.V. ${prspeed}ms]`,pings]

                admindata = data;
            }
            else {
                failNotif(data['resp'],2500)
            }
            
        }
    },5000)


    setInterval(()=>{
        if (JSON.stringify(oldadmindata) != JSON.stringify(admindata)){
            oldadmindata = admindata;
            var avg = nId('admin-variable-grid');
            avg.innerHTML = ""
            var vari = null;
            var vars = null;
            var varc = null;
            for (const [key, value] of Object.entries(admindata['resp']['variables'])){
                if (value[1] == 2){
                    vari = "bx bxs-check-circle"
                    vars = "Variable stable"
                    varc = "#3dd417"
                }
                else {
                    if (value[1] == 1){
                        vari = "bx bxs-error-circle"
                        vars = "Variable not fully stable"
                        varc = "#fabf19"
                    }
                    else {
                        vari = "bx bxs-x-circle"
                        vars = "Variable unstable"
                        varc = "#fa3b19"
                    }
                }
                        
                
                avg.innerHTML += 
                `
                <div class="object">	
                    <h1 class="name">${key.toUpperCase()}</h1>

                    <h1 class="value">${titleCase(value[0])}</h1>

                    <div class="data-flex">
                        <i class='${vari}' style="color: ${varc}"></i>
                        <h1>${vars}</h1>
                    </div>
                </div>
                `
                
                
                
            }

            var afg = nId('admin-function-grid');
            afg.innerHTML = ""


            for (const [key, value] of Object.entries(admindata['resp']['actions'])){							
                
                afg.innerHTML += 
                `
                <div class="object">	
                    <h1 class="name">${key.toUpperCase()}</h1>

                    <h1 class="desc">${value['desc']}</h1>

                    <button class="pink-plain-button flex" onClick="adminFunction('${key}');">
                            <i class='bx bxs-check-circle'></i>
                            Execute
                    </button>
                </div>
                `
                
                
                
            }

        }
    },500)





    preloaderClose()
    //WHAT


    `
    const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
    ];
    const data = {
    labels: labels,
    datasets: [{
        label: 'Noice',
        backgroundColor: '#ff0066',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45,55],
    },
    {
        label: 'Noice2',
        backgroundColor: '#ff0066',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 100, 55, 23, 12, 8, 145],
    }]
    };
    
    const config = {
    type: 'line',
    data: data,
    options: {}
    };
    
    var myChart = new Chart(
        nId('myChart'),
        config
    );

    `

    setTimeout(function(){
        window.scrollTo(0,0);
        AOS.init({
            once: true
        });
        
        setTimeout(function(){
            
            document.documentElement.style.scrollBehavior = "smooth";
            $('.loader-anim').on('animationiteration webkitAnimationIteration', function () {
                var $this = $(this);

                $this.removeClass('loader-anim');

                $this.off();
            });
        },1000)
    },500)







}
