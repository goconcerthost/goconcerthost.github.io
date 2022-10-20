function loadFooter() {
    nId("footer").innerHTML = `
    <div class="footer-flex">
                
    <div class="data-flex">
        <img src="img/nitlix/best_pieces2.png" alt="">
        <div class="data-flex-v">
            <h1>Nitlix</h1>
            <p>nitlix.pro</p>
        </div>
        
    </div>

    <div class="data-flex-v">
        <p class="highlight">Legal</p>
        <p onclick="nO('ncis')">NCIS</p>
    </div>



    <div class="data-flex-v">
        <p class="highlight">Navigation</p>
        <p>Home</p>
        <a href="account">
            <p>Account</p>
        </a>
        <p>Altyra</p>
        <a href="https://eswap.pro">
            <p>eSwap</p>
        </a>
        <p>Paleclick</p>
    </div>




    <div class="data-flex-v">

        <p class="highlight">Social Media</p>

        <a href="https://instagram.com/nitlixis" target="_blank">
            <p>Instagram</p>
        </a>
        <a onclick="nView('about')">
            <p>Discord</p>
        </a>
        <a href="https://twitch.tv/nitlixis" target="_blank">
            <p>Twitch</p>
        </a>
        <a href="https://github.com/nitlix" target="_blank">
            <p>Github</p>
        </a>
        <a href="https://stackoverflow.com/users/18389672/nitlixis" target="_blank">
            <p>Stack Overflow</p>
        </a>

        <a href="https://twitter.com/nitlixis" target="_blank">
            <p>Twitter</p>
        </a>

    </div>
    </div>

    <a href="ncis" target="_blank">
    <p class="c" onclick="nO('ncis')">Copyright © 2022 Nitlix (.pro) S.T. All rights reserved.</p>
    </a>



`
}

console.log('footer.js Initiated 🚀')