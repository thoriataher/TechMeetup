import { loginUser } from "./apis.js";
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message, #email-err, #pass-err');
    errorElements.forEach(element => {
        element.textContent = '';
        element.classList.add('hidden');
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    clearErrors();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    let isValid = true;

    if (email === '') {
        showError('email-error', 'Email is required');
        isValid = false;
        return
    } else if (!validateEmail(email)) {
        showError('email-error', 'Invalid email format');
        isValid = false;
        return
    }
    if (password === '') {
        showError('password-error', 'Password is required');
        isValid = false;
        return
    }
    if (email && validateEmail(email) && password) {
        isValid = true
    }

    if (isValid) {
        const loginData = { email, password }
        const result = await loginUser(loginData)
        if (result?.company_id & result.company_logo_url) {
            localStorage.setItem('company_id', result.company_id);
            localStorage.setItem(`company_logo_${result.company_id}`, result.company_logo_url);
        }
        if (result?.message) {
            window.location.href = 'dashboard.html'
        } else {
            showError('form-error', result?.error || 'invalid email or password')
        }
    }
});

