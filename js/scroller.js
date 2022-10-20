
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

function reach(name){
    document.getElementById(name).scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
    });
}

function nView(name){
    e = nId(name);
    elheight = e.offsetHeight;
    loc = getOffset(e).top;

    scrollto = loc + (elheight/2) - (window.innerHeight/2);
    console.log(loc)
    window.scrollTo(0,scrollto);
}

function gotopage(name){
    window.location.href = name;
}

function goto(name){
    document.querySelectorAll(name)[0].scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
    });
}

function email(){
    var email = "nitlix.away@gmail.com";
      var mailto_link = 'mailto:' + email;
      window = window.open(mailto_link, 'emailWindow');
      if (window && window.open && !window.closed){
        window.close()
      }     
}





console.log('scroller.js Initiated 🚀')