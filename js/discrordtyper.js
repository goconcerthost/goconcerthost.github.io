function typer(){
    fetch("https://discord.com/api/v9/channels/930095425837469726/messages", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,de;q=0.8",
        "authorization": "NTY3NjQxNTI1NzA2Njg2NDc0.Gm8hqI.xRvupaWmv12alOEh_OEVNd-6PdmOlKlQau6yx4",
        "content-type": "application/json",
        "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-debug-options": "bugReporterEnabled",
        "x-discord-locale": "en-GB",
        "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwNS4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTA1LjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjE1MDQ4OSwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0="
    },
    "referrer": "https://discord.com/channels/901449956567691295/930095425837469726",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"content\":\"lmfao\",\"nonce\":\"1026140089853411328\",\"tts\":false}",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
    });
}


var e = setInterval(()=>{
    typer()
},8000)