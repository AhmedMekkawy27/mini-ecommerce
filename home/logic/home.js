let menuBtn = document.getElementById('menu-btn');
let addCart = document.querySelectorAll('.add-cart');
let data = JSON.parse(localStorage.getItem('user'))
let cartLink = document.querySelector('.cart-link').querySelector('span');
let product = {}
let productCounter;

// Check if user is logged in or not
if(!localStorage.getItem('user')){
    window.location.href = 'login.html';
}

// Navbar mobile menu
menuBtn.onclick = function() {
    document.getElementById('navbar-sticky').classList.toggle('hidden')
}

if(data.products.length > 0){
    cartLink.classList.remove('hidden')
    cartLink.textContent = data.products.length
}


addCart.forEach(function(item){
    data.products.forEach(function(product){
        if(item.querySelector('span').parentNode.previousElementSibling.previousElementSibling.textContent.trim() === product.description){
            item.querySelector('span').textContent = product.quantity
            item.querySelector('span').classList.remove('hidden')
        }
    })
})

// Add the product to cart
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
            
            item.querySelector('span').textContent = product.quantity

            if(item.querySelector('span').classList.contains('hidden')){
                item.querySelector('span').classList.remove('hidden')
            }

            // Update cart link
            if(cartLink.classList.contains('hidden')){
                cartLink.classList.remove('hidden')
            }
            cartLink.textContent = data.products.length
    })
})

// logout

document.querySelector('.logout').onclick = function() {
    localStorage.removeItem('user')
    window.location.href = 'login.html'
}
