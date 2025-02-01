const createBtn = document.querySelector(".create-btn");

createBtn.addEventListener("click", () => {
  let firstName = document.forms["shippingForm"]["firstName"].value;
  let lastName = document.forms["shippingForm"]["lastName"].value;
  let address = document.forms["shippingForm"]["address"].value;
  let city = document.forms["shippingForm"]["city"].value;
  let country = document.forms["shippingForm"]["country"].value;
  let postalCode = document.forms["shippingForm"]["postalCode"].value;

  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const addressError = document.getElementById("addressError");
  const cityError = document.getElementById("cityError");
  const countryError = document.getElementById("countryError");
  const pinCodeError = document.getElementById("pinCodeError");

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
  if (address === "") {
    addressError.textContent = "Please enter address.";
    isValid = false;
  } else {
    addressError.textContent = "";
    isValid = true;
  }
  if (city === "") {
    cityError.textContent = "Please enter city.";
    isValid = false;
  } else {
    cityError.textContent = "";
    isValid = true;
  }
  if (country === "") {
    countryError.textContent = "Please chosse a country.";
    isValid = false;
  } else {
    countryError.textContent = "";
    isValid = true;
  }
  if (pinCode === "") {
    pinCodeError.textContent = "Please enter pin code.";
    isValid = false;
  } else {
    pinCodeError.textContent = "";
    isValid = true;
  }
  if (isValid) {
    return true;
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
