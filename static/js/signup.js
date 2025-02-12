import { registerCompany } from "./apis.js";

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUrl(url) {
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlRegex.test(url);
}

function showSuccess(elementId, message) {
    const successElement = document.getElementById(elementId);
    successElement.textContent = message;
    successElement.style.display = 'block';
}
document.getElementById('register-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const companyLogoUrl = document.getElementById('company-logo-url').value.trim();
    const password = document.getElementById('password').value.trim();

    let isValid = true;

    if (name === '') {
        showError('name-error', 'Company Name is required');
        isValid = false;
    }

    if (email === '') {
        showError('email-error', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email-error', 'Invalid email format');
        isValid = false;
    }

    if (companyLogoUrl === '') {
        showError('company-logo-url-error', 'Company Logo URL is required');
        isValid = false;
    } else if (!validateUrl(companyLogoUrl)) {
        showError('company-logo-url-error', 'Invalid URL format');
        isValid = false;
    }

    if (password === '') {
        showError('password-error', 'Password is required');
        isValid = false;
    } else if (password.length < 8) {
        showError('password-error', 'Password must be at least 8 characters');
        isValid = false;
    }

    if (!isValid) {
        return
    } else {
        const result = await registerCompany({
            name,
            email,
            logo_url: companyLogoUrl,
            password
        }, showError, showSuccess);
        if (result?.message) {
            showSuccess('success-message', result.message);
            window.location.href = "login.html";
        } else {
            showError('form-error', result.message);
        }
    }

});
