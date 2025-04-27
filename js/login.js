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
        // Check credentials against stored users
        const users = JSON.parse(localStorage.getItem('usersList'));
        const user = users.find(u => {
            // u.username === username.value.trim() && 
            console.log(u.phone, phone.value.trim())
            console.log(u.password, password.value)
            return u.phone == phone.value.trim() &&
            u.password == password.value
        }
            
        );
        
        if (user) {
            // Successful login
            // Store current user in session
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', "true");
            // Redirect to home page
            window.location.href = '../pages/home.html';
        } else {
            // Failed login
            showError(password, 'Invalid username, phone or password');
        }
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