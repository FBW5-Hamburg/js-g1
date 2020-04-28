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

            // checking number of products saved in the local storage
               // console.log(cartArray.length);
            

        }
  // checking all products Array saved in the local storage

    //console.log(cartArray);

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
        
        //label for amount
        let productAmountLabel = document.createElement('label')
        productAmountLabel.innerHTML = "Amount"
        container.append(productAmountLabel)

        //input for amount
        let productAmount = document.createElement('input')
        productAmount.setAttribute("type", "number")
        productAmount.value = "1"
        container.append(productAmount)
        
        // btn buy
        let btnBuy = document.createElement('button')
        btnBuy.innerText = "Buy"
        container.append(btnBuy)
     
        document.querySelector('main').append(container)
       
        btnBuy.addEventListener('click', e => {
            //connected with cart .html
            window.location.href = "/cart.html";
            // create product object
            let p = parseFloat(products[i].price)
            let a = parseFloat(productAmount.value)
            
          let prodTotal = (p*a).toFixed(2)
          //instance of class
          let buyProduct = new product(products[i].name, products[i].imgSmall,"",prodTotal,products[i].category,"","0.19",a)
            //console.log(buyProduct);
            //add new item to the cartArray
           cartArray.push(buyProduct)

          
           
          // console.log(myAmount);
          //console.log(productAmount.value);
          
            //convert object to json
            let cartArrayJson = JSON.stringify(cartArray)

            // save items in the local storage
            localStorage.setItem('cartlist',cartArrayJson)

            // checking all products Array saved in the local storage
            //console.log(cartArrayJson);
            
            });
        
          
        }
        

    
    }).catch(error => {
        console.log(error);
        
    })
}
