"use strict"









/* ********************************************************************* HEADER ********************************************************************** */
async function getHeader() {
    let response = await fetch('./temp/header.html')
    if(response.ok) {
        let data = await response.text()
        let header = document.querySelector('header')
        header.innerHTML = data
        let sportswear = document.querySelector('[name="sportswear"]')
        sportswear.addEventListener('click', e => {
            console.log(e);
        getSportswear()    
        })
    } else {
        console.log('Connect Error');
    }

}

getHeader()



function getSportswear() {
    let sportswear = document.querySelector('[name="sportswear"]')
    sportswear.addEventListener('click', e => {
        console.log(e);
    getSportswear()    
    })
}

function loadEventListeners(){
            sportswear.addEventListener('click', function (e){
                console.log('helo')
            })
                
    
    
}

