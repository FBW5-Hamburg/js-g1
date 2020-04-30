"use strict"
/* ********************************************************************* HEADER ********************************************************************** */
async function getHeader() {
    let response = await fetch('./temp/header.html')
    if(response.ok) {
        let data = await response.text()
         let header = document.querySelector('header')
        header.innerHTML = data

        //find existing cartlist
        let jsonObj= localStorage.getItem('cartlist')
        //convert json to js object
        let convertedArr = JSON.parse(jsonObj)
        cartToggle(convertedArr)
        

        document.querySelector('body').onscroll = function(e) {scrollFunction(header)};

    } else {
        console.log('Connect Error');
    }  
}

getHeader()

function cartToggle(array){
    let emptyCart = document.querySelector('#emptyCart')
    let fullCart = document.querySelector('#fullCart')
    if(array.length){
        emptyCart.style.display =  'none'
        fullCart.style.display =  'block'
    } else {
        emptyCart.style.display =  'block'
        fullCart.style.display =  'none'
    }
}
                    
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


