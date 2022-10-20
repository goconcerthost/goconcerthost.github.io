
let triggers = [];
let locations = [];

function r(){
    var x = document.querySelectorAll('.nrsl');
    for (var i = 0; i < x.length; i++) {
        if (x[i].classList.contains("nsrl-fadeup")){
            
            colors.push("yellow");
        }
    } 

}

function trigger(trigger){

}

function check(){

}

window.addEventListener('resize', function(){
    r();
});

window.addEventListener('scroll', function(){
    check();
});

