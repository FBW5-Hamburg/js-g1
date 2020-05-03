"use strict"

/* ********************************************************************* GLOBAL LET ********************************************************************** */
// define scroll
let scrollTop = 0
// define link of main sub navigation point
let category = ''
// define local stroage Array
let cartArray =[]

/* ********************************************************************* FUNCTIONS ********************************************************************** */
// send XMLHttpRequest
function loadData(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.send()
        xhr.onload = () => {          
            if(xhr.status == 200){
                resolve(xhr.response)
            } else {
                reject('Connect Error!')
            }
        }
    })
}
// switch cart icon
function cartIcon(array){
    // select cart icon
    let emptyCart = document.querySelector('#emptyCart')
    let fullCart = document.querySelector('#fullCart')
    if(array && array.length > 0){
        emptyCart.style.display =  'none'
        fullCart.style.display =  'block'
    } else {
        emptyCart.style.display =  'block'
        fullCart.style.display =  'none'
    }
}
// hide and show header
function scrollFunction(header) {
    //console.log(window.pageYOffset);
    if (window.pageYOffset - scrollTop >= 0 ) {
        header.style.position = "relative";  
    } else {    
      header.style.position = "fixed";
    }
    scrollTop = window.pageYOffset
}
/* ********************************************************************* ONLOAD ********************************************************************** */
window.onload = () => {
/* ********************************************************************* HEADER ********************************************************************** */
    // get header
    let header = document.querySelector('header')
    // scroll up and down header 
    document.querySelector('body').onscroll = function(e) {scrollFunction(header)}
    // catch flag
    let flag = document.querySelector('#flag')
    // select category
    if(flag.classList[1]){
        switch (flag.classList[0]) {
            case "1":
                switch (flag.classList[1]) {
                    case "shoes":
                        category = './json/shoes.json'
                        break
                    case "sportswear":
                        category ='./json/sportswear.json'
                    case "accessories":
                        console.log('no page found')
                        break     
                }
                break
            case "2":
                switch (flag.classList[1]) {
                    case "shoes":
                        category = '../json/shoes.json'
                        break
                    case "sportswear":
                        category ='../json/sportswear.json'
                    case "accessories":
                        console.log('no page found')
                        break
                    default:
                        category = ''
                        console.log('no page found')
                        break     
                }
                break
            default:
                console.log('Connect Error!')
                break       
        } 
    }
/* ********************************************************************* CART ********************************************************************** */
    // find existing cartlist
    let cart = JSON.parse(localStorage.getItem('cartlist'))
    // add existing cartlist items to cartArray 
    if(cart) {
        cart.forEach(element =>{
            cartArray.push(element)   
        })
    }
    // switch cart icon
    cartIcon(cart)
    // message for empty cart
    if (flag.classList.length === 0) {
        if (!cart || cart.length === 0) {
            let h2 = document.createElement('h2')
            h2.innerText = "The cart is empty."
            document.querySelector('main').append(h2)
        } else {
            
            let tableElem = document.createElement('table');
    
            let HeaderrowElem = document.createElement('tr')
            tableElem.appendChild(HeaderrowElem)
    
            let tHeader1 = document.createElement('th')
            HeaderrowElem.appendChild(tHeader1)     
            tHeader1.innerText = "Article"
    
            let tHeader2 = document.createElement('th')
            HeaderrowElem.appendChild(tHeader2)     
            tHeader2.innerText = "Name"
    
            
            let tHeader3 = document.createElement('th')
            HeaderrowElem.appendChild(tHeader3)     
            tHeader3.innerText = "Amount"
            
            
            let tHeader4 = document.createElement('th')
            HeaderrowElem.appendChild(tHeader4)     
            tHeader4.innerText = ""
            
            let tHeader5 = document.createElement('th')
            HeaderrowElem.appendChild(tHeader5)     
            tHeader5.innerText = "Price"
    
            let a = cart.length;
    
            let sumPrice = 0
    
            for (var i = a-1; i >= 0; i--) {
    
                let rowElem = document.createElement('tr')
    
                let col_1 = document.createElement('td')
                col_1.style.backgroundImage = `url(${cart[i].productImg})`
                rowElem.appendChild(col_1)
    
                // name
                let productName = document.createElement('td')
                productName.innerText = cart[i].productName
                rowElem.appendChild(productName)
    
                //amount
                let productAmount = document.createElement('td')
                productAmount.innerText = cart[i].amount
                rowElem.appendChild(productAmount)
    
                //delete
                let deleteProduct = document.createElement('td')
                rowElem.appendChild(deleteProduct)
                
                let deleteBtn = document.createElement('button')
                deleteBtn.innerText = 'delete'
                deleteProduct.appendChild(deleteBtn)
                
                let deletedItem = cart[i]

                deleteBtn.addEventListener('click', e => {
                    //console.log(deletedItem)
                    let index = cart.indexOf(deletedItem)
                    //console.log(index)
                    cart.splice(index, 1)
                    // console.log(cart);
    
                    // save items in the local storage
                    localStorage.setItem('cartlist', JSON.stringify(cart))
                    location.reload();
                });
    
                // price
                let productPrice = document.createElement('td')
                productPrice.innerText = cart[i].productPrice + " €"
                rowElem.appendChild(productPrice)
                sumPrice = parseFloat(sumPrice)+ parseFloat(cart[i].productPrice)
                tableElem.appendChild(rowElem)
            }
    
            document.body.appendChild(tableElem)
    
            //creat Total-row element for table
    
            let totalrowElem = document.createElement('tr')
            tableElem.appendChild(totalrowElem)
    
            let td = document.createElement('td')
            totalrowElem.appendChild(td)
    
            td = document.createElement('td')
            totalrowElem.appendChild(td)
    
            td = document.createElement('td')
            totalrowElem.appendChild(td)
    
            let totalPriceTEXT = document.createElement('td')
            totalPriceTEXT.innerText = 'Total Amount:'
            totalrowElem.appendChild(totalPriceTEXT)
    
            let totalPrice = document.createElement('td')
            totalPrice.innerText = sumPrice.toFixed(2) + ' €'
            totalrowElem.appendChild(totalPrice)
    
            document.querySelector('main').append(tableElem)
        }
    }
/* ********************************************************************* PRODUCTS PAGE ********************************************************************** */
    // get and set data to category page
    if(category && !flag.classList[2]) {
        loadData(category).then(productsJSON => {
            let products = JSON.parse(productsJSON).arrProducts
            // create and set product
            products.forEach(item => {
                let container = document.createElement('div')
                // image
                let productIMG = document.createElement('a')
                productIMG.href = item.url
                productIMG.style.backgroundImage = `url(${item.imgSmall})`
                container.append(productIMG)
                // category
                let productCategory = document.createElement('h2')
                productCategory.innerText = item.category
                container.append(productCategory)
                // name
                let productName = document.createElement('h3')
                productName.innerText = item.name
                container.append(productName)
                // price
                let productPrice = document.createElement('span')
                productPrice.innerText = item.price + " €"
                container.append(productPrice)
                // btn buy
                let btnBuy = document.createElement('button')
                btnBuy.innerText = "Buy"
                container.append(btnBuy)
                // put in cart
                btnBuy.onclick = () => {
                    //connected with cart .html
                    // window.location.href = "/cart.html";
        
        
                    // collect data of product 
                    let buyProduct = new Product(item.name, item.imgSmall,"",parseFloat(item.price).toFixed(2),item.category,"","0.19","1")
                    cartArray.push(buyProduct)
                    localStorage.setItem('cartlist',JSON.stringify(cartArray))
                    cartIcon(cartArray)
                }
                document.querySelector('main').append(container)  
            })
        })
    }
/* ********************************************************************* PRODUCT PAGE ********************************************************************** */
    // get and set data to product page
    let currentPage = window.location.href
    if(flag.classList[2]) {
        loadData(category).then(productJSON => {
            let products = JSON.parse(productJSON).arrProducts
            let productPage = currentPage.slice(currentPage.lastIndexOf('/'))
            for(let i = 0; i < products.length; i++) {
                if(products[i].url.includes(productPage)) {
                    let container = document.createElement('article')
                    // image
                    let productIMG = document.createElement('div')
                    productIMG.href = products[i].url
                    productIMG.style.backgroundImage = `url(.${products[i].imgLarge})`
                    container.append(productIMG)
                    // category
                    let productCategory = document.createElement('h2')
                    productCategory.innerText = products[i].category
                    container.append(productCategory)
                    // name
                    let productName = document.createElement('h3')
                    productName.innerText = products[i].name
                    container.append(productName)
                    // article
                    let productSpec = document.createElement('section')
                    productSpec.innerText = products[i].specification
                    container.append(productSpec)
                    // price
                    /*
                    let nettoPrice = document.createElement('span')
                    nettoPrice.innerText = Math.round(product.price / 119 * 100) + " €"
                    container.append(nettoPrice)
                    */  
                    let bruttoPrice = document.createElement('span')
                    bruttoPrice.innerText = products[i].price + " €"
                    container.append(bruttoPrice)   
                    //label for amount
                    let productAmountLabel = document.createElement('label')
                    productAmountLabel.innerHTML = "Amount"
                    container.append(productAmountLabel)
                    // input for amount
                    let productAmount = document.createElement('input')
                    productAmount.setAttribute('type','number')
                    productAmount.min = "1"
                    productAmount.style.size = "2"
                    productAmount.value = "1"
                    container.append(productAmount)
                    // btn buy
                    let btnBuy = document.createElement('button')
                    btnBuy.innerText = "Buy"
                    container.append(btnBuy)
                    // put product into cart
                    btnBuy.addEventListener('click', e => {
                        //connected with cart .html
                        // window.location.href = "/cart.html"
            
                        // create product object
                        let p = parseFloat(products[i].price)
                        let a = parseFloat(productAmount.value)
                        
                        let prodTotal = (p*a).toFixed(2)
                        
                        //instance of class
                        let byProduct = new Product(products[i].name, products[i].imgSmall, "", prodTotal, products[i].category, "", "0.19", a)
                        
                        //add new product to the cartArray
                        cartArray.push(byProduct)
                        //convert object to json
                        let cartArrayJson = JSON.stringify(cartArray)
            
                        // save products in the local storage
                        localStorage.setItem('cartlist',cartArrayJson)
                        cartIcon(cartArray)
                    })
                    // append product to document
                    document.querySelector('main').append(container)
                    break
                }
            }
        }).catch(error => {
            console.log(error)
        })
    }

}
