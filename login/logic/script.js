let username = document.getElementById('username');
let password = document.getElementById('password');
let = user = {}

if(localStorage.getItem('user')){
    window.location.href = 'index.html';
}

document.querySelector('button').onclick = function(e){
    e.preventDefault();
    if(username.value !== '' || password.value !== ''){
        user = {
            credintials: {
                username: username.value,
                password: password.value
            },
            products: [],
        }
        localStorage.setItem('user', JSON.stringify(user))
        window.location.href = 'pages/index.html'
        username.value = '';
        password.value = '';
    }
 
}