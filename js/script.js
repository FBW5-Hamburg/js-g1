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
window.onload = () => {
    getProducts().then(response => {
        for(let i = 0; i < response.length; i++) {
        let container = document.createElement('div')
        let products = JSON.parse(response).arrProducts
        // image
        let productIMG = document.createElement('div')
        productIMG.style.backgroundImage = "url(" + products[i].imgSmall + ")"
        container.append(productIMG)
        // category
        let productCategory = document.createElement('h2')
        productCategory.innerText = products[i].category
        container.append(productCategory)
        // name
        let productName = document.createElement('h3')
        productName.innerText = products[i].name
        container.append(productName)
        // price
        let productPrice = document.createElement('span')
        productPrice.innerText = products[i].price + " €"
        container.append(productPrice)
        // btn buy
        let btnBuy = document.createElement('button')
        btnBuy.innerText = "Buy"
        container.append(btnBuy)
        btnBuy.addEventListener('click', e => {
            myProduct = {
                
            }
            
        })

        document.querySelector('main').append(container)
        }
        
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }).catch(error => {
        console.log(error);
        
    })
}
