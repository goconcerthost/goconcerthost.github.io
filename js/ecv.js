var watching=1,lowpc=2,highpc=11,currencies={BTC:{route:"BTC/USD","future-route":"BTC-0930","future-timestamp":1664535600,coin:"Bitcoin"},ETH:{route:"ETH/USD","future-route":"ETH-0930","future-timestamp":1664535600,coin:"Etherium"}},cnames=Object.keys(currencies);function swapC(e){watching=e,document.getElementById("currentc").innerText=currencies[cnames[watching]].coin}function openftx(){window.open(`https://ftx.com/trade/${currencies[cnames[watching]].route}`)}window.onload=(async()=>{var e=document.querySelectorAll(".crypto-list")[0];for(x=0;x<Object.keys(currencies).length;x++)e.innerHTML+=`<div onclick='swapC(${x})'>${cnames[x]}</div>`;null==localStorage.getItem("saves")&&(document.getElementById("lowpc").value=lowpc,document.getElementById("highpc").value=highpc,swapC(1)),setInterval(async()=>{var e=null,n=null;document.getElementById("main").innerText=currencies[cnames[watching]].coin,await fetch(`https://api.nitlix.pro/api/v1/ecv?crypto=${currencies[cnames[watching]].route}`).then(e=>e.json()).then(n=>{e=n.resp.result.asks[0][0],document.getElementById("currentprice").innerText="$"+e.toLocaleString(void 0,{minimumFractionDigits:2})}),await fetch(`https://api.nitlix.pro/api/v1/ecv?crypto=${currencies[cnames[watching]]["future-route"]}`).then(e=>e.json()).then(e=>{n=e.resp.result.asks[0][0],document.getElementById("futureprice").innerText="$"+n.toLocaleString(void 0,{minimumFractionDigits:2})}),current=Math.round((new Date).getTime()/1e3),difference=(n-e)/e*100,unixdifference=currencies[cnames[watching]]["future-timestamp"]-current,yeardifference=(difference/unixdifference*31557600).toFixed(2),monthdifference=(yeardifference/12).toFixed(2),yeardifference>0&&(yeardifference="+"+yeardifference),monthdifference>0&&(monthdifference="+"+monthdifference),document.getElementById("fpy").innerText=yeardifference+"%",document.getElementById("fpm").innerText=monthdifference+"%"},5e3)});