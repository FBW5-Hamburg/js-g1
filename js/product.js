/* ******************************************************************** PRODUCTS ******************************************************************** */
function getProducts(data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', data)
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
    getProducts('./shoes.json').then(response => {
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
        productAmount.style.type = "number"
        container.append(productAmount)     
        // btn buy
        let btnBuy = document.createElement('button')
        btnBuy.innerText = "Buy"
        container.append(btnBuy) 
        document.querySelector('main').append(container)    
        btnBuy.addEventListener('click', e => {
           // function of cart js

            });
        
          
        }  
    })
} 