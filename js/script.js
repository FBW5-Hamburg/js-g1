"use strict"
/* ********************************************************************* HEADER ********************************************************************** */
async function getHeader() {
    let response = await fetch('/temp/header.html')
    if(response.ok) {
        let data = await response.text()
         let header = document.querySelector('header')
        header.innerHTML = data
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

