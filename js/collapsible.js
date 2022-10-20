window.onload=function(){
    var coll = document.querySelectorAll(".menu-show");
    console.log(coll.length);
    document.getElementById("collapsible-menu").style.transform = "translateX(100%)";
    document.getElementById("collapsible-menu").style.height = window.innerHeight + "px";
    
    for (i = 0; i < coll.length; i++) {

        coll[i].addEventListener("click", function() {
            
            var content = document.getElementById("collapsible-menu");
            if (!content.classList.contains("collapsible-menu-show")){
                document.getElementById("collapsible-menu").classList.add("collapsible-menu-show");
                document.getElementById("scrollheaderlink").style.borderRadius = "15px 0 0 15px";
            } else {
                document.getElementById("collapsible-menu").classList.remove("collapsible-menu-show");
                document.getElementById("scrollheaderlink").style.borderRadius = "15px";
            } 
        });
    }
    
    window.addEventListener('resize', function(){
        document.getElementById("collapsible-menu").style.height = window.innerHeight + "px";
    });
}
