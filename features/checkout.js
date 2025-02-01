const user = localStorage.getItem("cust");
const getUserToken = JSON.parse(user);
const userToken = getUserToken.token;
const checkoutBtn = document.querySelector(".checkout-btn");

checkoutBtn.addEventListener("click", () => {
  let firstName = document.forms["shippingForm"]["firstName"].value;
  let lastName = document.forms["shippingForm"]["lastName"].value;
  let address = document.forms["shippingForm"]["address"].value;
  let city = document.forms["shippingForm"]["city"].value;
  let country = document.forms["shippingForm"]["country"].value;
  let pinCode = document.forms["shippingForm"]["pinCode"].value;

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
    let total = 0;
    let orderData = [];
    fetch(`http://localhost:5000/api/user/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.map((item) => {
          total += item.quantity * item.price;
          const newOrderData = {
            shippingInfo: {
              firstname: firstName,
              lastname: lastName,
              address: address,
              city: city,
              pincode: pinCode,
            },
            paymentInfo: {
              cardNumber: "",
              cardHolderName: "",
              expiryDate: "",
            },
            orderItems: {
              product: item.productId,
              color: item.color,
              size: item.size,
              quantity: item.quantity,
              price: item.price,
            },
            totalPrice: total,
          };
          orderData.push({ ...newOrderData });
          localStorage.setItem("checkout", JSON.stringify(orderData));
          window.location = "payment.html";
        });
      })
      .catch((e) => console.log(e));
  } else {
    return false;
  }
});

const getUserCartInCheckOut = async () => {
  await fetch(`http://localhost:5000/api/user/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        const items = `<div class="col-md-12 mt-5 text-center">No Data</div>`;
        document.querySelector(".cart-body").innerHTML += items;
        document.querySelector(".total").textContent = `Total $ 0.00`;
      } else {
        let total = 0;
        let items = "";
        data.map((item) => {
          const subtotal = item.quantity * item.price;
          total += subtotal;

          items += `<div class="row mt-3 border-bottom border-light-subtle">
                      <div class="col-md-4 text-black-50">
                        <p class="text-black-50">
                          ${item.productId.title}
                          <br />
                          <small class="text-black-50">Size : ${
                            item?.size?.title == undefined
                              ? "Nan"
                              : item?.size?.title
                          }</small>
                          <br />
                          <small class="text-black-50">Color : ${
                            item?.color?.title == undefined
                              ? "Nan"
                              : item?.color?.title
                          }</small>
                        </p>
                      </div>
                      <div class="col-md-4 text-center text-black-50">${
                        item.quantity
                      }</div>
                      <div class="col-md-4 text-end text-black-50">$ ${subtotal}</div>
                    </div>`;
        });
        document.querySelector(".total").textContent = `Total $ ${total}`;
        document.querySelector(".cart-body-checkout").innerHTML = items;
      }
    })
    .catch((e) => console.log(e));
};
getUserCartInCheckOut();

getTotal();
async function getTotal() {
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
