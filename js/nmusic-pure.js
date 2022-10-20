//Definitely not copied from anywhere O_o
//No, not this thing; the fact that you are looking at this is mersmerizing.
var r = null;
var currentvol = 0;


function toTwo(e){
    if (e.toString().length == 1){
        return "0" + e;
    }
    else {
        return e;
    }
}
function onYouTubeIframeAPIReady() {
    var e = document.getElementById("youtube-audio"),
        t = document.createElement("img");
    t.setAttribute("id", "youtube-icon"), t.style.cssText = "cursor:pointer;cursor:hand", e.appendChild(t);
    var a = document.createElement("div");
    a.setAttribute("id", "youtube-player"), e.appendChild(a);
    var o = function(e) {
        var a = e ? "M10.75,0 C12.8210678,-3.80448985e-16 14.5,1.67893219 14.5,3.75 L14.5,32.25 C14.5,34.3210678 12.8210678,36 10.75,36 C8.67893219,36 7,34.3210678 7,32.25 L7,3.75 C7,1.67893219 8.67893219,3.80448985e-16 10.75,0 Z M24.1785714,0 C26.2496392,-3.80448985e-16 27.9285714,1.67893219 27.9285714,3.75 L27.9285714,32.25 C27.9285714,34.3210678 26.2496392,36 24.1785714,36 C22.1075036,36 20.4285714,34.3210678 20.4285714,32.25 L20.4285714,3.75 C20.4285714,1.67893219 22.1075036,3.80448985e-16 24.1785714,0 Z" : "M32.3882151,19.9436628 L5.38398971,35.6931885 C4.31043318,36.3193129 2.93256951,35.9565976 2.30644505,34.883041 C2.10574968,34.5389276 2,34.1477049 2,33.7493424 L2,2.25029109 C2,1.00748964 3.00748964,0 4.25029109,0 C4.64865357,0 5.0398763,0.105749683 5.38398971,0.30644505 L32.3882151,16.0559707 C33.4617716,16.6820952 33.824487,18.0599589 33.1983625,19.1335154 C33.0027348,19.4689398 32.7236395,19.748035 32.3882151,19.9436628 Z";
        document.getElementById("youtube-audio").style.opacity = '0';
        if (e){
            document.querySelector('.nmusic-img').style.animationName = "spin";
            document.querySelector('.nmusic-img').style.animationPlayState = "running";
        }
        else {
            document.querySelector('.nmusic-img').style.animationPlayState = "paused";
        }
        setTimeout(function(){
            document.getElementById("youtube-audio-path").setAttribute('d',a);
            document.getElementById("youtube-audio").style.opacity = '1';
        },250)
    };
    e.onclick = function() {
        r.getPlayerState() === YT.PlayerState.PLAYING || r.getPlayerState() === YT.PlayerState.BUFFERING ? (r.pauseVideo(), o(!1)) : (r.playVideo(), o(!0))
    };


    //Check if user paused not using the button (Just every second)


    r = new YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: e.dataset.video,
        playerVars: {
            autoplay: e.dataset.autoplay,
            loop: e.dataset.loop
        },
        events: {
            onReady: function(e) {
                r.setPlaybackQuality("small"), o(r.getPlayerState() !== YT.PlayerState.CUED)
            },
            onStateChange: function(e) {
                e.data === YT.PlayerState.ENDED && o(!1)
            }
        }
    })

    currentvol = r.getVolume();

    update=null;
    setInterval(function(){
        current = Math.floor(r.getCurrentTime());
        duration = Math.floor(r.getDuration());
        if (update != current){
            duration = Math.round(r.getDuration());
            update = current;
        }
        left = duration - current;
        percent = Math.round(current/(duration/100));
        document.getElementById('nmusic-prog').style.width = percent + "%";

        min = Math.floor(current/60);
        sec = toTwo(Math.floor(current - (min*60)));
        document.getElementById('elapsed').innerText = min + ":" + sec;


        min = Math.floor(left/60);
        sec = toTwo(Math.floor(left - (min*60)));
        document.getElementById('elapsed-right').innerText = "-" + min + ":" + sec;


    },100)
}


function changeVol(i){
    r.setVolume(i);
    vi = document.getElementById('volume-icon');


    if (i==100){
        vi.classList.remove(...vi.classList);
        vi.classList.add('bx');
        vi.classList.add('bxs-volume-full');
    }
    else {
        if (i==0){
            vi.classList.remove(...vi.classList);
            vi.classList.add('bx');
            vi.classList.add('bxs-volume-mute');
        }
        else {
            vi.classList.remove(...vi.classList);
            vi.classList.add('bx');
            vi.classList.add('bxs-volume-low');
        }
    }

}