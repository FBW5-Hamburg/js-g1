class product {
    constructor(name,img_url,article_number,price,catagory,discription,tax,amount){
    this.productName = name
    this.productImg = img_url
    this.productNumber = article_number
    this.productPrice = price
    this.productCatagory = catagory
    this.productDesc = discription
    this.Tax = tax
    this.amount = amount
    }
    brutto(){
        return Math.round(this.productPrice*(1+this.tax/100)) 

    }
    total(){
        let totalAmount = 0
        
    }
 
}