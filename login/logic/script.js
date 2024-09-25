let email = document.getElementById('email');
let password = document.getElementById('password');
let = user = {}

if(localStorage.getItem('user')){
    window.location.href = 'index.html';
}

document.querySelector('button').onclick = function(e){
    e.preventDefault();
    if(email.value !== '' && password.value !== ''){
        user = {
            credintials: {
                email: email.value,
                password: password.value
            },
            products: [],
        }
        localStorage.setItem('user', JSON.stringify(user))
        window.location.href = 'index.html'
        username.value = '';
        password.value = '';
    }else{
        alert('Please fill in both fields')
    }
 
}