let blogCategoriesList = [];

var logInBtnElement = document.getElementById('log-in-btn');
var logInFormElement = document.querySelector('.log-in-form');
var closeBtnElement = document.getElementById('add');
var mailInputElement = document.getElementById('mail');

var submitBtnElement = document.querySelector('.mail-input button');
var logInSuccessElement = document.querySelector('.log-in-success');
var logInInputElement = document.querySelector('.log-in-input');
var submitSuccessBtnElement = document.querySelector('.log-in-success button');
var errorTextElement = document.querySelector('.error');
var logInBgElement = document.querySelector('.log-in-form-bg');

logInBtnElement.addEventListener('click', () => {
    logInFormElement.removeAttribute('style');
    logInBgElement.removeAttribute('style');
})

closeBtnElement.addEventListener('click', () => {
    logInFormElement.setAttribute('style', 'display: none')
    logInBgElement.setAttribute('style', 'display: none')
})

submitSuccessBtnElement.addEventListener('click', () => {
    logInFormElement.setAttribute('style', 'display: none')
    logInBgElement.setAttribute('style', 'display: none')
})

submitBtnElement.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(mailInputElement.value)
    let formDataElement = new FormData();
    formDataElement.append('email', mailInputElement.value)

    fetch('https://api.blog.redberryinternship.ge/api/login', {
        method: "POST",
        headers: {
            'accept': 'application/json',
        },
        body: formDataElement
    }).then(res => {
        if (res.status == 204) {
            logInSuccessElement.removeAttribute('style');
            logInInputElement.setAttribute('style', 'display: none');
            logInBtnElement.setAttribute('style', 'display: none');
            newBlogElement.removeAttribute('style');
        } else {
            errorTextElement.removeAttribute('style');
            submitBtnElement.removeAttribute('style');
        }
        return res.status;
    })
        .then(data => {
            console.log(data);
            if (data == 204) {
                localStorage.setItem('isLoggedIn', true)
            }
        })
        .catch(error => console.error('Error:', error));
})
