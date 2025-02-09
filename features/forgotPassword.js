const forgotPasswordBtn = document.querySelector(".forgotPassword-btn");
forgotPasswordBtn.addEventListener("click", () => {
  const email = document.querySelector(".email").value;
  let isValid = true;
  if (email === "" || !email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  } else {
    emailError.textContent = "";
    isValid = true;
  }

  if (isValid) {
    fetch(`http://localhost:5000/api/user/forget-password-token`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: email }),
    })
      .then((repsone) => repsone.json())
      .then((data) => {
        if (data.message.startsWith("Error")) {
          emailError.textContent = data.message;
        } else {
          emailError.textContent = "";
          console.log(data);
        }
      })
      .catch((e) => console.log(e));
  } else {
    return false;
  }
});
