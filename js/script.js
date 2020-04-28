"use strict"









/* ********************************************************************* HEADER ********************************************************************** */
async function getHeader() {
    let response = await fetch('./temp/header.html')
    if(response.ok) {
        let data = await response.text()
        let header = document.querySelector('header')
        header.innerHTML = data
        if (
            "IntersectionObserver" in window &&
            "IntersectionObserverEntry" in window &&
            "intersectionRatio" in window.IntersectionObserverEntry.prototype
          ) {
                let observer = new IntersectionObserver(entries => {
                    if (entries[0].boundingClientRect.y < 0) {
                        document.body.classList.add("header-not-at-top");
                    } else {
                        document.body.classList.remove("header-not-at-top");
                    }
                });
                console.log(observer);
                
                observer.observe(document.querySelector("#top-of-site-pixel-anchor"));
        }
          
          
    } else {
        console.log('Connect Error');
    }

}

getHeader()
// function loadEventListeners(){
//             sportswear.addEventListener('click', function (e){
//                 console.log('helo')
//             })
                
    
    
// }


 