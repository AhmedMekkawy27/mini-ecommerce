let data = JSON.parse(localStorage.getItem('user'))
let cartItems = document.querySelector('.cart-items')
let total = document.querySelector('.total')
let product;

if(!localStorage.getItem('user')){
    window.location.href = 'login/login.html';
}

if(data.products.length > 0){
    data.products.forEach(function(item){
        product = document.createElement('div')
        product.classList.add('bg-white', 'shadow-lg', 'rounded-lg', 'p-6', 'flex','flex-col', 'sm:flex-row', 'gap-4' ,'sm:justify-between', 'items-center')
        product.innerHTML = `
        <div class="flex flex-col w-full sm:w-auto sm:flex-row items-center gap-4 self-start sm:self-stretch">
            <img
              src="${item.image}"
              alt="Product Image"
              class="w-20 h-20 object-cover rounded"
            />
            <div class= "item-wrapper self-start sm:self-stretch flex flex-col gap-1">
              <h2 class="font-semibold text-lg">${item.name}</h2>
              <p class="description text-[16px]">${item.description}</p>
              <p class="text-gray-500">${item.price}</p>
            </div>
        </div>
          <div class="quantity-wrapper flex items-center gap-4">
            <button class="quantity-decrease text-gray-500 bg-gray-100 p-2 rounded">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-increase text-gray-500 bg-gray-100 p-2 rounded">+</button>
            <button class="remove text-red-500 ms-3">Remove</button>
          </div>
        `
        cartItems.appendChild(product)

        if(product.querySelector('.quantity-wrapper').querySelector('.quantity').textContent == 0){
            product.querySelector('.quantity-wrapper').querySelector('.quantity').previousElementSibling.classList.add('hidden')
        }else{
            product.querySelector('.quantity-wrapper').querySelector('.quantity').nextElementSibling.classList.remove('hidden')
        }
    })
    total.textContent = `$${data.products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}`

    document.addEventListener('click', function(event){
        if(event.target.classList.contains('quantity-decrease')){
            data.products.forEach(function(item, index, arr){
                if(event.target.parentNode.previousElementSibling.querySelector('.item-wrapper').querySelector('.description').textContent == item.description){
                    event.target.nextElementSibling.textContent--
                    item.quantity-=1
                    let products = [
                        item,
                        ...arr.filter(p => p.description!== item.description),
                    ]
                    localStorage.setItem('user', JSON.stringify({...data, products: products}))
                    total.textContent = `$${arr.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}`
                }
            })
            if(parseInt(event.target.nextElementSibling.textContent) === 0){
                event.target.classList.add('hidden')
            }
        }
    
        else if(event.target.classList.contains('quantity-increase')){
            data.products.forEach(function(item, index, arr){
                if(event.target.parentNode.previousElementSibling.querySelector('.item-wrapper').querySelector('.description').textContent === item.description){
                    event.target.previousElementSibling.textContent++
                    item.quantity+=1
                    let products = [
                        item,
                        ...arr.filter(p => p.description!== item.description),
                    ]
                    localStorage.setItem('user', JSON.stringify({...data, products: products}))
                    total.textContent = `$${arr.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}`
                }
            })
            if(parseInt(event.target.previousElementSibling.textContent) > 0){
                event.target.previousElementSibling.previousElementSibling.classList.remove('hidden')
            }
        }
    
        else if(event.target.classList.contains('remove')){
            let products = data.products.filter(p => p.description!== event.target.parentNode.previousElementSibling.querySelector('.item-wrapper').querySelector('.description').textContent)
            data.products = products
            total.textContent = `$${data.products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}`
            console.log(products)
            localStorage.setItem('user', JSON.stringify({...data, products: products}))
            event.target.parentNode.parentNode.remove()
        }
     
    })
} else{
    total.textContent = `$${data.products.length.toFixed(2)}`
}

document.querySelector('.logout').onclick = function() {
    localStorage.removeItem('user')
    window.location.href = 'login/login.html'
}
