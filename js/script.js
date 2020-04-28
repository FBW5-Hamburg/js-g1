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
        getSportswear(e)    
        })
        let shoes = document.querySelector('[name="shoes"]')
        shoes.addEventListener('click', e => {
            console.log(e);
        getSportswear(e)  
    } else {
        console.log('Connect Error');
    }
}

getHeader()

/* ******************************************************************** PRODUCTS ******************************************************************** */
function getProducts() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', '/data.json')
        xhr.send()
        xhr.onload = () => {          
            if(xhr.status == 200){
                resolve(xhr.response)
            } else {
                reject('The products could not been found.')
            }
        }
    })
}