
// const firstname = document.getElementById("firstname").value.trim();
// const lastname = document.getElementById("lastname").value.trim();
// //const phoen = document.getElementById("phone").value;
// const email = document.getElementById("email").value.trim();
// const password = document.getElementById("password").value;
// const confirmPassword = document.getElementById("confirmPassword").value;
let r = document.getElementById("save");
r.addEventListener("click", function () {
    if (password != confirmPassword) {
        alert("Passwords do not match.");
        // return;
    }
    else alert("Signup successful!");
  
})




