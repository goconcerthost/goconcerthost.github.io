function dark(){
    try {
        document.documentElement.classList.remove('lightmode')
    }
    catch(err){}
    console.log(1)
    document.documentElement.classList.add('darkmode')

}

function light(){
    try {
        document.documentElement.classList.remove('lightmode')
    }
    catch(err){}
    document.documentElement.classList.add('lightmode')
}




function darkmode(){
    if (localStorage.getItem('dark-mode') == null){
        localStorage.setItem('dark-mode',"O");
        light();
    }
    else {
        if (localStorage.getItem('dark-mode') == "E"){
            dark();
        }
        else {
            light();
        }
    }
}

function toggledarkmode(secret = false){
    if (localStorage.getItem('dark-mode') == "O"){
        localStorage.setItem('dark-mode',"E");
    }
    else {
        localStorage.setItem('dark-mode',"O");
    }
    if (secret){
        successNotif('Secret button discovered! ;)', 2500)
    }
    darkmode();
    
}

darkmode();
