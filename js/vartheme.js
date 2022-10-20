if (localStorage.getItem('theme-main') == null){
    localStorage.setItem('theme-main','#FF0066');
}

if (localStorage.getItem('theme-dark') == null){
    localStorage.setItem('theme-dark','#EB005E');
}

function updateMain(local){
    var r = document.querySelector(':root');
    r.style.setProperty('--main-color', local);
    localStorage.setItem('theme-main',local);
}

function updateDark(local){
    var r = document.querySelector(':root');
    r.style.setProperty('--main-color-dark', local);
    localStorage.setItem('theme-dark',local);
}

function varthemeDefaultInit(){
    document.getElementById('varthememain').value = localStorage.getItem('theme-main');
    document.getElementById('varthemedark').value = localStorage.getItem('theme-dark');
}

updateMain(localStorage.getItem('theme-main'));
updateDark(localStorage.getItem('theme-dark'));

//Wait a second, why..... why are you here?
//          *visible confusion*