var clientbuild = 3;

function clientAction(){
    try {
        document.getElementById('success-text').innerText = "Updating Client...";
        document.getElementById('success-display').classList.add('active');
        setTimeout(function(){
            document.getElementById('success-display').classList.remove('active');
        },2500);
    }
    catch(err){}


    for (var i = 0; i < localStorage.length; i++){
        if (localStorage.key(i) == 'dark-mode'){
            localStorage.removeItem(localStorage.key(i))
        }
    }
}


build = localStorage.getItem('client-build')
if (build != clientbuild){
    if (build != null){
        clientAction();
    }
    localStorage.setItem('client-build',clientbuild);
}