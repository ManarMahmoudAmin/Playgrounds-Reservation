document.querySelector('form').addEventListener('submit', function(e) {
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
