const PortfolioContainer = document.getElementById('PortfolioContainer');
const PortfolioScrollWidth = PortfolioContainer.scrollWidth;



function updatePortfolioScroll(){
    const first = document.querySelector('#PortfolioContainer div');

    if(!isElementInViewport(first)){
        PortfolioContainer.appendChild(first);
        PortfolioContainer.scrollTo(PortfolioContainer.scrollLeft - first.offsetWidth -32, 0);
    }
    if (PortfolioContainer.scrollLeft !== PortfolioScrollWidth) {
        PortfolioContainer.scrollTo(PortfolioContainer.scrollLeft + 1, 0);
    }
}
function isElementInViewport (el) {
    var rect = el.getBoundingClientRect();
    return (rect.right+32)> 0;
}


console.log('Portfolio-Scroller.js Initiated 🚀')