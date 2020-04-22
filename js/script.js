"use strict"

/* ********************************************************************* HEADER ********************************************************************** */
async function getHeader() {
    let response = await fetch('./temp/header.html')
    if(response.ok) {
        let data = await response.text()
        let header = document.querySelector('header')
        header.innerHTML = data
    } else {
        console.log('Connect Error');
    }
}

getHeader()

























































































































































































/* ****************************************************************Rebecca********************************************************************************************* */
let xhr = new XMLHttpRequest();
xhr.open('GET', '/data.json');
xhr.send();
xhr.onload = function (){
    if(xhr.status == 200){
        let products = JSON.parse(xhr.response).arrayOfProducts
        
        for (let i = 0; i < products.length; i++){
                
                
                
                let container = document.createElement('div')
                let productImg = document.createElement('img')
                productImg.src = products[i].imgUrl
                container.append(productImg)


                let productName = document.createElement('h4')
                productName.innerText = products[i].name
                container.append(productName)

                let productPrice = document.createElement('span')
                productPrice.innerText = products[i].price + 'Euro'
                container.append(productPrice)

                document.body.append(container)
                
            
        }     
        
    }
}





