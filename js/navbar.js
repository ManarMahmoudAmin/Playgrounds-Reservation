window.onload = function () {
  let navbarContainer = document.getElementById('navbar-container');
  let currentPath = window.location.pathname;
  let isProtectedPage = currentPath.includes('profile.html') || currentPath.includes('bookings.html');

  if (isProtectedPage) {
    localStorage.setItem('isLoggedIn', 'true');
  }

  let navbarHTML = `
    <nav class="navbar">
      <a href="../../index.html" class="logo">GameSpot</a>
      <div class="nav-links">
        <a href="../pages/signup.html" id="registerLink" class="nav-link">Register</a>
        <a href="../pages/signin.html" id="signinLink" class="nav-link">Sign In</a>
        <a href="../pages/home.html" id="logoutLink" class="nav-link" style="display:none;">Logout</a>
      </div>
    </nav>
  `;

  navbarContainer.innerHTML = navbarHTML;

  let navbar = document.querySelector('.navbar');
  let registerLink = document.getElementById('registerLink');
  let signinLink = document.getElementById('signinLink');
  // let bookingsLink = document.getElementById('bookingsLink');
  // let profileLink = document.getElementById('profileLink');
  let logoutLink = document.getElementById('logoutLink');

  function updateNavbar() {
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      navbar.classList.add('logged-in');
      // profileLink.style.display = 'inline';
      logoutLink.style.display = 'inline';
      registerLink.style.display = 'none';
      signinLink.style.display = 'none';
    } else {
      navbar.classList.remove('logged-in');
      // profileLink.style.display = 'none';
      logoutLink.style.display = 'none';
      registerLink.style.display = 'inline';
      signinLink.style.display = 'inline';
    }
  }

  logoutLink.addEventListener('click', function (e) {
    e.preventDefault(); 
    localStorage.setItem('currentUser', null);
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = '../../index.html';
  });

  signinLink.addEventListener('click', function () {
    localStorage.setItem('isLoggedIn', 'true');
    updateNavbar();
  });

  updateNavbar();
};