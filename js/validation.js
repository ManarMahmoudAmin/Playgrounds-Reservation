document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());
    
    // Get form elements
    const username = document.getElementById('username');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    let isValid = true;

    // Username validation
    if (username.value.trim().length < 5) {
        isValid = false;
        showError(username, 'Username must be at least 5 characters');
    }

    // Phone validation
    const phoneRegex = /^01[0125]\d{8}$/;
    if (!phoneRegex.test(phone.value.trim())) {
        isValid = false;
        showError(phone, 'Invalid Egyptian phone number (01XXXXXXXXX)');
    }

    // Password validation
    if (password.value.length < 5 || password.value.length > 20) {
        isValid = false;
        showError(password, 'Password must be 5-20 characters long');
    }

    if (isValid) {
        // Here you should proceed to authentication or form submit
        console.log("Login form valid ✅");
        // this.submit();  // Uncomment if you want actual submission
    }
});

function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = 'red';
    error.style.fontSize = '0.8rem';
    error.style.marginTop = '5px';
    error.textContent = message;
    input.parentNode.appendChild(error);
}

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let errors = [];

    // Remove previous error messages
    let existingErrorDiv = document.getElementById('errorMessages');
    if (existingErrorDiv) {
        existingErrorDiv.remove();
    }

    // Create new error container
    const errorDiv = document.createElement('div');
    errorDiv.id = 'errorMessages';
    errorDiv.style.color = 'red';
    errorDiv.style.margin = '10px 0';
    this.parentNode.insertBefore(errorDiv, this);

    // Form fields
    const FullName = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Full Name validation
    if (!FullName) {
        errors.push('Full name is required');
    } else if (!/^[a-zA-Z\s-']+$/.test(FullName)) {
        errors.push('Full name contains invalid characters');
    }

    // Phone validation
    if (!phone) {
        errors.push('Phone number is required');
    } else if (!/^01[0-9]{9}$/.test(phone)) {
        errors.push('Phone must be 11 digits starting with 01');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
        errors.push('Invalid email format');
    }

    // Password validation
    if (!password) {
        errors.push('Password is required');
    } else if (password.length < 5 || password.length > 20) {
        errors.push('Password must be between 5-20 characters');
    }

    // Confirm Password validation
    if (!confirmPassword) {
        errors.push('Confirm Password is required');
    } else if (password !== confirmPassword) {
        errors.push('Passwords do not match');
    }

    // Display errors
    if (errors.length > 0) {
        errorDiv.innerHTML = errors.map(error => `<p>${error}</p>`).join('');
    } else {
        console.log("Signup form valid ✅");
        // this.submit(); // Uncomment to actually submit
    }
});
