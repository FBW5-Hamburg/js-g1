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
        window.onscroll = function() {scrollFunction()};
        scrollFunction()
    } else {
        console.log('Connect Error');
    }

    
}

getHeader()

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("navbar").style.top = "-50px";
    } else {
      document.getElementById("navbar").style.top = "0";
    }
  }
