"use strict"
/* ******************************************************************** PRODUCTS ******************************************************************** */
let category = ''
function getProducts() {
    let collection = document.querySelector('#category')
    if(collection){
        switch (collection.innerText) {
            case "shoes":
                category = './shoes.json'
                break
            case "sportswear":
                category ='./sportswear.json'
            case "accessories":
                console.log('no page found')
                break
            default:
             console.log('no page found')
                break       
        }
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', category)
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
}

function getProduct() {    
    if(document.querySelector('#product-json')){
        let productJson = document.querySelector('#product-json').innerText
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', productJson)
            xhr.send()
            xhr.onload = () => {          
                if(xhr.status == 200){
                    resolve(xhr.response)
                } else {
                    reject('The product could not been found.')
                }
            }
        })
    }
}

window.onload = () => {

    //define local stroage Array
    let cartArray =[] 
    //find existing cartlist
    let jsonObj= localStorage.getItem('cartlist')
        if(jsonObj != null){
            //convert json to js object
            let convertedArr= this.JSON.parse(jsonObj)
            //add existing cartlist items to cartArray 
            convertedArr.forEach(element =>{
             cartArray.push(element)   
            });

            // let cartIconEmpty = document.querySelector('[name = cart]')
            // let cartIconFull = document.querySelector('[name =cartFull]')


            // console.log(cartIconEmpty);

            // if (jsonObj.length == 0) {
            //     cartIconFull.style.styledisplay = "none";
            //     cartIconEmpty.style.display = "block";
            // }else{
            //     cartIconFull.style.display = "block";
            //     cartIconEmpty.style.display = "none";
            // }

            // checking number of products saved in the local storage
               // console.log(cartArray.length);
            

        }
    if(getProducts()) {   
        getProducts().then(response => {
            let products = JSON.parse(response).arrProducts
            for(let i = 0; i < products.length; i++) {
                let container = document.createElement('div')
                // image
                let productIMG = document.createElement('a')
                productIMG.href = products[i].url
                productIMG.style.backgroundImage = `url(${products[i].imgSmall})`
                productIMG.name = products[i].name
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
                    // function of cart js
                    //connected with cart .html
                    window.location.href = "/cart.html";

                    // create product object
                    let p = parseFloat(products[i].price)
                    let a = parseFloat(productAmount.value)
                    
                    let prodTotal = (p*a).toFixed(2)

                    //instance of class
                    let buyProduct = new product(products[i].name, products[i].imgSmall,"",prodTotal,products[i].category,"","0.19",a)

                    //add new item to the cartArray
                    cartArray.push(buyProduct)

                    //convert object to json
                    let cartArrayJson = JSON.stringify(cartArray)

                    // save items in the local storage
                    localStorage.setItem('cartlist',cartArrayJson)
    
                });
                // append product to document
                document.querySelector('main').append(container)     
            }  
        }).catch(error => {
            console.log(error)
        })
    }
    
    if(getProduct()) {   
        getProduct().then(response => {
            let product = JSON.parse(response).arrProducts
            let currentPage = window.location.href
            product.forEach(item => {
                if(item.url && item.url.slice(item.url.lastIndexOf('/')) === currentPage.slice(currentPage.lastIndexOf('/'))) {
                    let container = document.createElement('article')
                    // image
                    let productIMG = document.createElement('div')
                    productIMG.href = item.url
                    productIMG.style.backgroundImage = `url(${item.imgLarge})`
                    container.append(productIMG)
                    // category
                    let productCategory = document.createElement('h2')
                    productCategory.innerText = item.category
                    container.append(productCategory)
                    // name
                    let productName = document.createElement('h3')
                    productName.innerText = item.name
                    container.append(productName)
                    // article
                    let productSpec = document.createElement('section')
                    productSpec.innerText = item.specification
                    container.append(productSpec)
                    // price
                    let nettoPrice = document.createElement('span')
                    nettoPrice.innerText = Math.round(item.price / 119 * 100) + " €"
                    container.append(nettoPrice)  
                    let bruttoPrice = document.createElement('span')
                    bruttoPrice.innerText = item.price + " €"
                    container.append(bruttoPrice)   
                    //label for amount
                    let productAmountLabel = document.createElement('label')
                    productAmountLabel.innerHTML = "Amount"
                    container.append(productAmountLabel)
                    // input for amount
                    let productAmount = document.createElement('input')
                    productAmount.type = "number"
                    productAmount.min = "1"
                    productAmount.style.size = "2"
                    productAmount.value = "1"
                    container.append(productAmount)     
                    // btn buy
                    let btnBuy = document.createElement('button')
                    btnBuy.innerText = "Buy"
                    container.append(btnBuy)
                    btnBuy.addEventListener('click', e => {
                    // function of cart js

                    })
                    // append product to document
                    document.querySelector('main').append(container)
                }
                
                
            })

                  
        }).catch(error => {
            console.log(error)
        })
    }
}
