var sideMenuStatus = false;

function showSideMenu(){
    if (!sideMenuStatus){
        nId('sidemenu').style.transform = "translateX(0rem)"
    }
    else {
        nId('sidemenu').style.transform = "translateX(20rem)"
    }

    sideMenuStatus = !sideMenuStatus;
}

// NITLIXPRO.JS IS THE OFFICIAL PRIMARY LIBRARY FOR ANY OF THE NITLIX APPS
// FALLS FULLY UNDER COPYRIGHT OF NITLIX S.T. AND GO! SERVICES
console.log("sidemenu.js initiated 🚀")