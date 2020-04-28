"use strict"

/* ********************************************************************* HEADER ********************************************************************** */
async function getHeader() {
    let response = await fetch('./temp/header.html')
    if(response.ok) {
        let data = await response.text()
        let header = document.querySelector('header')
        header.innerHTML = data
    //     let sportswear = document.querySelector('[name="sportswear"]')
    //     sportswear.addEventListener('click', e => {
    //         console.log(e);    
    //     })
    //     getSportswear()
    // } else {
    //     console.log('Connect Error');
    }
}

getHeader()








/* ************************** CART ************************ */
window.onload = () => {

    //define local stroage Array
    let cartArray =[] 
    //find existing cartlist
    let jsonObj= localStorage.getItem('cartlist')
    //convert json to js object
    let convertedArr = this.JSON.parse(jsonObj)
    console.log(convertedArr[0].productIMG);

        
  // checking all products Array saved in the local storage
    //console.log(cartArray);

    let tableElem = document.createElement('table');
    tableElem.style.border = "1px solid black"

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
    tHeader4.innerText = "Price"
   


    let a = convertedArr.length;
    let sumPrice = 0

        for (var i = a-1; i >= 0; i--) {

            let rowElem = document.createElement('tr')

            console.log(convertedArr[i])

            let col_1 = document.createElement('td')

            col_1.style.border = "1px solid black"

            let productIMG = document.createElement('img')
            productIMG.src = convertedArr[i].productIMG
            col_1.appendChild(productIMG)
            console.log(col_1);
            rowElem.appendChild(col_1)

            // name
            let productName = document.createElement('td')
            productName.innerText = convertedArr[i].productName
            rowElem.appendChild(productName)
            productName.style.border = "1px solid black"

            //amount
            let productAmount = document.createElement('td')
            productAmount.innerText = convertedArr[i].amount
            rowElem.appendChild(productAmount)
            productAmount.style.border = "1px solid black"
            console.log(productAmount)



            // price
            let productPrice = document.createElement('td')
            productPrice.innerText = convertedArr[i].productPrice + " €"
            rowElem.appendChild(productPrice)

            sumPrice = parseFloat(sumPrice )+ parseFloat(convertedArr[i].productPrice)

            productPrice.style.border = "1px solid black"

            tableElem.appendChild(rowElem)
        }

        document.body.appendChild(tableElem)

        let totalrowElem = document.createElement('tr')
        tableElem.appendChild(totalrowElem)

        let totalPriceTEXT = document.createElement('td')
        totalPriceTEXT.innerText = 'Total Amount:'
        totalrowElem.appendChild(totalPriceTEXT)

        let totalPrice = document.createElement('td')
        totalPrice.innerText = sumPrice.toFixed(2)
        totalrowElem.appendChild(totalPrice)




        

        document.querySelector('main').append(tableElem)

    /*


    let container = document.createElement('Table');

    for(let i = 0; i < convertedArr.length; i++) {
        // image
        let container = document.createElement('tr');



        let productIMG = document.createElement('div')
        // productIMG.style.backgroundImage = "url(" + convertedArr[i].imgSmall + ")"
        // container.append(productIMG)
        // category
        let productCategory = document.createElement('h2')
        productCategory.innerText = convertedArr[i].category
        container.append(productCategory)
        // name
        let productName = document.createElement('h3')
        productName.innerText = convertedArr[i].name
        container.append(productName)
        // price
        let productPrice = document.createElement('span')
        productPrice.innerText = convertedArr[i].price + " €"
        container.append(productPrice)
      
        document.querySelector('main').append(container)
         
        }
        */
        
    };
