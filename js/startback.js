function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}


window.onload=function(){
    document.getElementById('startback').style.background = "url('img/UI/backgrounds/" + randomNum(1,7) + ".jpg');"
};
