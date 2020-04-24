class product {
    constructor(name,img_url,article_number,price,catagory,discription,tax){
    this.productName = name
    this.productImg = img_url
    this.productNumber = article_number
    this.productPrice = price
    this.productCatagory = catagory
    this.productDesc = discription
    this.Tax = tax
}
brutto(){
    return Math.round(this.productPrice*(1+this.tax/100)) 

}
 
}