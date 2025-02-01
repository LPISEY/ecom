const loginBtn = document.querySelector(".login-btn");

loginBtn.addEventListener("click", () => {
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const invalide = document.getElementById("invalide");

  let isValid = true;
  if (email === "" || !email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  } else {
    emailError.textContent = "";
    isValid = true;
  }
  if (password === "" || password.length < 6) {
    passwordError.textContent =
      "Please enter a password with at least 6 characters.";
    isValid = false;
  } else {
    passwordError.textContent = "";
    isValid = true;
  }
  if (isValid) {
    fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Invalide Credentials") {
          invalide.textContent = data.message;
        } else {
          localStorage.setItem("cust", JSON.stringify(data));
          window.location = "index.html";
          console.log(data);
        }
      })
      .catch((e) => console.log(e));
  } else {
    return false;
  }
});
