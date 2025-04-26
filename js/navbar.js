window.onload = function () {
  let currentPath = window.location.pathname;
  let isProtectedPage = currentPath.includes('profile.html') || currentPath.includes('bookings.html');

  if (isProtectedPage) {
    localStorage.setItem('isLoggedIn', 'true');
  }

  let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  document.getElementById('navbar-container').innerHTML = `
    <nav class="navbar">
        <a href="../../index.html" class="logo">GameSpot</a>
        <div class="nav-links">
            <a href="../pages/signup.html" id="registerLink" class="nav-link">Register</a>
            <a href="../pages/signin.html" id="signinLink" class="nav-link">Sign In</a>
            <a href="../pages/bookings.html" id="bookingsLink" class="nav-link" style="display:none;">Bookings</a>
            <a href="../pages/profile.html" id="profileLink" class="nav-link" style="display:none;">Profile</a>
            <a href="../pages/home.html" id="logoutLink" class="nav-link" style="display:none;">Logout</a>
        </div>
    </nav>
  `;

  let navbar = document.querySelector('.navbar');

  function updateNavbar() {
    let isLoggedInNow = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedInNow) {
      navbar.classList.add('logged-in');
      document.getElementById('bookingsLink').style.display = 'inline';
      document.getElementById('profileLink').style.display = 'inline';
      document.getElementById('logoutLink').style.display = 'inline';
      document.getElementById('registerLink').style.display = 'none';
      document.getElementById('signinLink').style.display = 'none';
    } else {
      navbar.classList.remove('logged-in');
      document.getElementById('bookingsLink').style.display = 'none';
      document.getElementById('profileLink').style.display = 'none';
      document.getElementById('logoutLink').style.display = 'none';
      document.getElementById('registerLink').style.display = 'inline';
      document.getElementById('signinLink').style.display = 'inline';
    }
  }

  document.getElementById('logoutLink').addEventListener('click', function (e) {
    e.preventDefault(); // to prevent the redirection behavior
    localStorage.setItem('isLoggedIn', 'false');
    updateNavbar();
    window.location.href = '../../index.html';
  });

  document.getElementById('signinLink').addEventListener('click', function () {
    localStorage.setItem('isLoggedIn', 'true');
    updateNavbar();
  });

  updateNavbar();
};
