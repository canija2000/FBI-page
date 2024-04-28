

//select form

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    console.log(email, password)
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email:email, password: password })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.datauser.email);
        localStorage.setItem('password', data.datauser.password);
        window.location.href = 'auth.html';

    })
    .catch(err => {
        console.log(err)
        window.location.href = 'error.html';
    })
})
