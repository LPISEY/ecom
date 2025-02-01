const sendBtn = document.querySelector(".send-btn");
sendBtn.addEventListener("click", () => {
  let yourName = document.forms["contactForm"]["yourName"].value;
  let email = document.forms["contactForm"]["email"].value;
  let mobile = document.forms["contactForm"]["mobile"].value;
  let comment = document.forms["contactForm"]["comment"].value;

  const yourNameError = document.getElementById("yourNameError");
  const emailError = document.getElementById("emailError");
  const mobileError = document.getElementById("mobileError");
  const commentError = document.getElementById("commentError");

  const data = {
    name: yourName,
    email: email,
    mobile: mobile,
    comment: comment,
  };

  let isValid = true;
  if (yourName === "") {
    yourNameError.textContent = "Please enter your name.";
    isValid = false;
  } else {
    yourNameError.textContent = "";
    isValid = true;
  }
  if (email === "" || !email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  } else {
    emailError.textContent = "";
    isValid = true;
  }
  if (mobile === "") {
    mobileError.textContent = "Please enter a mobile number.";
    isValid = false;
  } else {
    mobileError.textContent = "";
    isValid = true;
  }
  if (comment === "") {
    commentError.textContent = "Please enter your comment.";
    isValid = false;
  } else {
    commentError.textContent = "";
    isValid = true;
  }
  if (isValid) {
    const msg = document.getElementById("msg");
    fetch("http://localhost:5000/api/enquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        msg.textContent = "Successfully Send";
      })
      .catch((e) => console.log(e));
  } else {
    return false;
  }
});

getTotal();
async function getTotal() {
  const user = localStorage.getItem("cust");
  const getUserToken = JSON.parse(user);
  const userToken = getUserToken.token;

  const response = await fetch(`http://localhost:5000/api/user/cart`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  const data = await response.json();

  let totalQty = 0;
  let totalPrice = 0;

  data.map((item) => {
    totalQty += item.quantity;
    totalPrice += item.price * item.quantity;
  });
  document.querySelector(".totalItems").textContent = totalQty;
  document.querySelector(".totalPrice").innerText = "$ " + totalPrice;
}
