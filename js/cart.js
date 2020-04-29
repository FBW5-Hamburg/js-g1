"use strict"
/* ************************** CART ************************ */
window.onload = () => {

        //find existing cartlist
        let jsonObj= localStorage.getItem('cartlist')
        //convert json to js object
        let convertedArr = this.JSON.parse(jsonObj)

        if (convertedArr.length == 0) {
            let EmptyHeader = document.createElement('h2')
            EmptyHeader.innerText = "The Cart is Empty"
            document.querySelector('main').append(EmptyHeader)
        } 
    
        else {
        
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
    
        let a = convertedArr.length;

        let sumPrice = 0

            for (var i = a-1; i >= 0; i--) {

                let rowElem = document.createElement('tr')

                console.log(convertedArr[i])

                let col_1 = document.createElement('td')

                let productIMG = document.createElement('img')
                productIMG.src = convertedArr[i].productImg
                col_1.appendChild(productIMG)
                console.log(col_1);
                rowElem.appendChild(col_1)

                // name
                let productName = document.createElement('td')
                productName.innerText = convertedArr[i].productName
                rowElem.appendChild(productName)

                //amount
                let productAmount = document.createElement('td')
                productAmount.innerText = convertedArr[i].amount
                rowElem.appendChild(productAmount)
                console.log(productAmount)

                //delete
                let deleteProduct = document.createElement('td')
                rowElem.appendChild(deleteProduct)
                
                let deleteBtn = document.createElement('button')
                deleteBtn.innerText = 'delete'
                deleteProduct.appendChild(deleteBtn)
                
                let deletedItem = convertedArr[i]

        
                deleteBtn.addEventListener('click', e => {
                 //console.log(deletedItem)
                  let index = convertedArr.indexOf(deletedItem)
                  //console.log(index)
                  convertedArr.splice(index, 1)
                  // console.log(convertedArr);

                    // save items in the local storage
                  localStorage.setItem('cartlist', JSON.stringify(convertedArr))
                  location.reload();
                });

                // price
                let productPrice = document.createElement('td')
                productPrice.innerText = convertedArr[i].productPrice + " €"
                rowElem.appendChild(productPrice)
                sumPrice = parseFloat(sumPrice)+ parseFloat(convertedArr[i].productPrice)
                tableElem.appendChild(rowElem)
            }

            document.body.appendChild(tableElem)

            //creat Total-row element for table

            let totalrowElem = document.createElement('tr')
            tableElem.appendChild(totalrowElem)

            let totalPriceTEXT = document.createElement('td')
            totalPriceTEXT.innerText = 'Total Amount:'
            totalrowElem.appendChild(totalPriceTEXT)

            let totalPrice = document.createElement('td')
            totalPrice.innerText = sumPrice.toFixed(2) + ' €'
            totalrowElem.appendChild(totalPrice)

        document.querySelector('main').append(tableElem)
}
   
};
