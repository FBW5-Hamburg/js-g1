"use strict"
/* ********************************************************************* HEADER ********************************************************************** */
async function getHeader() {
    let response = await fetch('/temp/header.html')
    if(response.ok) {
        let data = await response.text()
        let header = document.querySelector('header')
        header.innerHTML = data
<<<<<<< HEAD
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
          
          
=======
        /*
        let sportswear = document.querySelector('[name="sportswear"]')
        sportswear.addEventListener('click', e => {
            console.log(e);
        getSportswear(e)    
        })
        let shoes = document.querySelector('[name="shoes"]')
        shoes.addEventListener('click', e => {
            console.log(e);
        getSportswear(e)  
        })
        */
>>>>>>> 76d3867be534b3540ef5347888c7a69252407837
    } else {
        console.log('Connect Error');
    }
}

getHeader()