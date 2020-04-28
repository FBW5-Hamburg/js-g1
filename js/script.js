"use strict"
/* ********************************************************************* HEADER ********************************************************************** */
async function getHeader() {
    let response = await fetch('/temp/header.html')
    if(response.ok) {
        let data = await response.text()
        let header = document.querySelector('header')
        header.innerHTML = data

    } else {
        console.log('Connect Error');

    }
}  

getHeader()
                    
// window.onload = () => {                  
// //find existing cartlist
// let jsonObj= localStorage.getItem('cartlist')

// console.log(jsonObj);

// let cartIconEmpty = document.querySelector('#cartEmpty')
// let cartIconFull = document.querySelector('#cartFull')


// //console.log(cartIconEmpty);

// if (jsonObj.length == 0) {
//     cartIconFull.style.display = "none";
//     cartIconEmpty.style.display = "block";
// }else{
//     cartIconFull.style.display = "block";
//     cartIconEmpty.style.display = "none";
// }

// };

