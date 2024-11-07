let shop=document.querySelector(".container");
let inputtext=document.querySelector(".input-text");
let basket=JSON.parse(localStorage.getItem('data'))||[];
let filter=[];
function getdata(){
    let products=[];
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                  products=json;
                  filter=json;
                  shop.innerHTML=products.map((x)=>{
                    return ` <div class="card" style="width: 19rem;">
                            <img height="390px" weight="70px" class="card-img-top" src=${x.image} alt="Card image cap">
                            <div class="card-body">
                              <h5 class="card-title">${x.title}</h5>
                              <p class="card-text">${x.description}</p>
                            </div>
                            <ul class="list-group list-group-flush">
                              <li class="list-group-item">RS.${x.price}</li>
                            </ul>
                            <button class="button" onclick="addToCart('${x.id}','${x.image}','${x.price}','${x.title}','${x.description}')">Add TO CART</button>
                          </div>`
                }).join('');
                
            })
            search();
}
getdata();
function addToCart(id,image,price,title,description){
  let filterProduct=basket.find((x)=>x.id===id);
  if(!filterProduct){  
   basket.push(
    {
        id:id,
        image:image,
        price:price,
        title:title,
        description:description,
        quantity:1
    })
  }
   localStorage.setItem('data',JSON.stringify(basket));
    console.log(basket);
}

function search(){
     let inputvalue=inputtext.value;
     inputtext.value="";
    let searchItem=inputvalue.toLowerCase();
    let filterEle=filter.filter((x)=>x.title.toLowerCase().includes(searchItem));
    shop.innerHTML="";
    shop.innerHTML=filterEle.map((x)=>{
        return ` <div class="card" style="width: 19rem;">
                            <img height="390px" weight="70px" class="card-img-top" src=${x.image} alt="Card image cap">
                            <div class="card-body">
                              <h5 class="card-title">${x.title}</h5>
                              <p class="card-text">${x.description}</p>
                            </div>
                            <ul class="list-group list-group-flush">
                              <li class="list-group-item">RS.${x.price}</li>
                            </ul>
                            <button class="button" onclick="addToCart('${x.id}','${x.image}','${x.price}','${x.title}','${x.description}')">Add TO CART</button>
                          </div>`
                }).join('');
    
}



