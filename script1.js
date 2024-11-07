let shoppingcart=document.querySelector(".container");
let basket=JSON.parse(localStorage.getItem('data'))||[];

shoppingcart.innerHTML=basket.map((x,index)=>{
    return `<div class="card rounded-3 mb-4">
                <div class="card-body p-4">
                  <div class="row d-flex justify-content-between align-items-center">
                    <div class="col-md-2 col-lg-2 col-xl-2">
                      <img src=${x.image}
                        class="img-fluid rounded-3" alt=${x.title}>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-3">
                      <p class="lead fw-normal mb-2">${x.description}</p>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                    <input id="quantity-${index}" type="number" min="1" value="1" onchange='updatePrice(this.value,${JSON.stringify(x)},${index})'>
                    </div>
                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h5 class="mb-0" id="price-${index}">RS.${x.price}</h5>
                    </div>
                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
                    </div>
                  </div>
                </div>
              </div>`
              
}).join('');

function updatePrice(newquantity,currobj,index){
  let priceEle=document.querySelector(`#price-${index}`);
  let updatecost=newquantity*currobj.price;
   priceEle.innerHTML=`RS.${updatecost}`; 
   totalamount(); 
}
function totalamount(){
  let sum=0;
   basket.forEach((item,index)=> {
    let quantityEle=document.querySelector(`#quantity-${index}`);
    let quantity=parseInt(quantityEle.value) || 1;
      sum=sum+item.price*quantity;
       
   }); 
   sum=sum.toFixed(2);
   let total=document.querySelector("#total");
    total.innerHTML=`RS.${sum}`;
}
totalamount();







