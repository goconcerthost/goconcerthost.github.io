function onetwo(num1){
    if (num1.toString().length == 1){
        return "0" + num1.toString();
    }
    else {
        return num1;
    }
}

function mtd(num1) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];

    returb(monthNames[num1]);
}


let stats = {
    data: null,
    hypixel: "https://api.hypixel.net/player?key=64879d4c-cf7b-4ebb-b71f-f79ffeb9a2e3&uuid=",
    actualid: "",
    fetchStats: function (username) {
        fetch(
          "https://sessionserver.mojang.com/session/minecraft/profile/" + 
            username
        )
          .then((response) => {
            if (!response.ok) {
              
                //Invalid UUID - Convert
                fetch(
                    "https://api.mojang.com/users/profiles/minecraft/" + 
                      username
                  )
                    .then((response) => {
                      e = response.json()
                      if (!response.ok) {
                        document.getElementById('statserror').innerHTML = "Unable to process given player."
                      }
                      
                      else {
                        const {id} = e;
                        
                        this.actualid = id;
                        this.displayStats();
                      }
                    })





            }
            else {
              this.actualid = username
                this.displayStats();
            }
          })
          
    },
      
    displayStats: function () {
        fetch(
            stats.hypixel + 
              stats.actualid
          )
            .then((response) => {
              if (!response.ok) {
                document.getElementById('statserror').innerHTML = "Unable to process given player.";
              }
              else {
                  stats.data = response.json();
              }
            });


        const { player, success} = stats.data;
        if (!success){
            document.getElementById('statserror').innerHTML = "Unable to process given player.";
            return;
        }

        const {displayname,karma,lastlogin,firstlogin} = player;
        var date = new Date(lastlogin * 1000);
        lastlogin = onetwo(date.getHours()) + ":" + onetwo(date.getMinutes()) + ":" + onetwo(date.getSeconds()) + " " + date.getDay() + " of " + mtd(date.getMonth()) + " " + date.getFullYear;
        var date = new Date(firstlogin * 1000);
        firstlogin = onetwo(date.getHours()) + ":" + onetwo(date.getMinutes()) + ":" + onetwo(date.getSeconds()) + " " + date.getDay() + " of " + mtd(date.getMonth()) + " " + date.getFullYear;





        document.getElementById('player_name').innerHTML = displayname;
        document.getElementById('player_karma').innerHTML = karma;

               
    }
      };


var url = new URL(document.URL);
var c = url.searchParams.get("player");
stats.fetchStats(c)