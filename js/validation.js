
// const firstname = document.getElementById("firstname").value.trim();
// const lastname = document.getElementById("lastname").value.trim();
// //const phoen = document.getElementById("phone").value;
// const email = document.getElementById("email").value.trim();
// const password = document.getElementById("password").value;
// const confirmPassword = document.getElementById("confirmPassword").value;
// let r = document.getElementById("save");
// r.addEventListener("click", function () {
//     if (password != confirmPassword) {
//         alert("Passwords do not match.");
//         // return;
//     }
//     else alert("Signup successful!");
  
// })


let passwordValue = document.getElementById("password").value;
let confirmPasswordValue = document.getElementById("confirmPassword").value;

if (passwordValue !== confirmPasswordValue) {
    alert("Passwords do not match.");
} else {
    alert("Signup successful!");
}

let r = document.getElementById("save");
r.addEventListener("click", function (event) {
    event.preventDefault();
    let passwordValue = document.getElementById("password").value;
    let confirmPasswordValue = document.getElementById("confirmPassword").value;
    if (passwordValue !== confirmPasswordValue) {
        alert("Passwords do not match.");
    } else {
        alert("Signup successful!");
    }
});

