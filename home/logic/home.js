let menuBtn = document.getElementById('menu-btn');
let addCart = document.querySelectorAll('.add-cart');
let data = JSON.parse(localStorage.getItem('user'))
let product = {}
let productCounter;

if(!localStorage.getItem('user')){
    window.location.href = 'login.html';
}

menuBtn.onclick = function() {
    document.getElementById('navbar-sticky').classList.toggle('hidden')
}

addCart.forEach(function(item){
    item.addEventListener('click', function(e){
        if(data.products.length > 0){
            for(let i = 0; i < data.products.length; i++){
                if(data.products[i].description === e.target.parentNode.querySelector('.description').innerHTML.trim()){
                    productCounter = data.products[i].quantity + 1
                }
            }
        }
        else{
            productCounter = 1
        }
        product = {
            name: e.target.parentNode.querySelector('.product-name').innerHTML.trim(),
            description: e.target.parentNode.querySelector('.description').innerHTML.trim(),
            price: parseFloat(e.target.parentNode.querySelector('.product-price').innerHTML.trim().slice(1)),
            image: e.target.parentNode.parentNode.querySelector('.product-img').src,
            quantity: productCounter? productCounter : 1,
        }
        data.products = [
            product,
           ...data.products.filter(p => p.description!== product.description)
        ]
            localStorage.setItem('user', JSON.stringify(data))
            productCounter = 1
    })
})

// logout

document.querySelector('.logout').onclick = function() {
    localStorage.removeItem('user')
    window.location.href = 'login.html'
}
