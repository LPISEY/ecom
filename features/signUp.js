const signupBtn = document.querySelector(".signup-btn");

signupBtn.addEventListener("click", () => {
  let firstName = document.forms["signUpForm"]["firstName"].value;
  let lastName = document.forms["signUpForm"]["lastName"].value;
  let email = document.forms["signUpForm"]["email"].value;
  let password = document.forms["signUpForm"]["password"].value;
  let confirmPassword = document.forms["signUpForm"]["confirmPassword"].value;

  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  let isValid = true;
  if (firstName === "") {
    firstNameError.textContent = "Please enter your first name.";
    isValid = false;
  } else {
    firstNameError.textContent = "";
    isValid = true;
  }
  if (lastName === "") {
    lastNameError.textContent = "Please enter your last name.";
    isValid = false;
  } else {
    lastNameError.textContent = "";
    isValid = true;
  }
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
  if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Password doesn't match!";
    isValid = false;
  } else {
    confirmPasswordError.textContent = "";
    isValid = true;
  }
  if (isValid) {
    const invalide = document.getElementById("invalide");
    fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User Already Exists") {
          invalide.textContent = "Email Already Exists";
        } else if (!data.message) {
          invalide.textContent = "Successfully Sign Up";
          console.log(data);
        }
      })
      .catch((e) => console.log(e));
  } else {
    return false;
  }
});
