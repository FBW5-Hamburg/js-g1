"use strict"
/* ********************************************************************* HEADER ********************************************************************** */
async function getHeader() {
    let response = await fetch('/temp/header.html')
    if(response.ok) {
        let data = await response.text()
         let header = document.querySelector('header')
        header.innerHTML = data
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
       document.querySelector('body').onscroll = function(e) {scrollFunction(header)};
    } else {
        console.log('Connect Error');
    }

    
}


getHeader()
let scrollTop = 0
function scrollFunction(header) {
    //console.log(window.pageYOffset);
    
    if (window.pageYOffset - scrollTop >= 0 ) {
        header.style.position = "relative";
      
    } else {
        
      header.style.position = "fixed";
    }
    scrollTop = window.pageYOffset
  }
