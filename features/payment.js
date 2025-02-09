const user = localStorage?.getItem("cust");
const getUserToken = JSON.parse(user);
const userToken = getUserToken?.token;
const paymentBtn = document.querySelector(".payment-btn");

paymentBtn.addEventListener("click", () => {
  const cardNumber = document.querySelector(".cardNumber");
  const cardHolderName = document.querySelector(".cardHolderName");
  const expiry = document.querySelector(".expiry");

  const cardNumberError = document.getElementById("cardNumberError");
  const cardHolderNameError = document.getElementById("cardHolderNameError");
  const expiryError = document.getElementById("expiryError");

  let isValid = true;
  if (cardNumber.value === "") {
    cardNumberError.textContent = "Please enter credit card number.";
    isValid = false;
  } else {
    cardNumberError.textContent = "";
    isValid = true;
  }
  if (cardHolderName.value === "") {
    cardHolderNameError.textContent = "Please enter card holder name.";
    isValid = false;
  } else {
    cardHolderNameError.textContent = "";
    isValid = true;
  }
  if (expiry.value === "") {
    expiryError.textContent = "Please enter expiry date.";
    isValid = false;
  } else {
    expiryError.textContent = "";
    isValid = true;
  }
  if (isValid) {
    const checkout = localStorage.getItem("checkout");
    const dataCheckout = JSON.parse(checkout);
    let orderData = [];
    let total = 0;
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
              firstname: dataCheckout[0].shippingInfo.firstname,
              lastname: dataCheckout[0].shippingInfo.lastname,
              address: dataCheckout[0].shippingInfo.address,
              city: dataCheckout[0].shippingInfo.city,
              pincode: dataCheckout[0].shippingInfo.pincode,
            },
            paymentInfo: {
              cardNumber: cardNumber.value,
              cardHolderName: cardHolderName.value,
              expiryDate: expiry.value,
            },
            orderItems: {
              product: item.productId,
              color: item?.color,
              size: item?.size,
              quantity: item.quantity,
              price: item.price,
            },
            totalPrice: total,
          };
          orderData.push({ ...newOrderData });
          fetch("http://localhost:5000/api/user/order/create-order", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(newOrderData),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                fetch(`http://localhost:5000/api/user/cart/${item._id}`, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                  },
                });
                window.location = "myprofile.html";
              }
            })
            .catch((e) => console.log(e));
        });
      })
      .catch((e) => console.log(e));
    return true;
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
                          ${item?.productId?.title}
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

userShipping();
function userShipping() {
  const checkout = localStorage.getItem("checkout");
  const dataCheckout = JSON.parse(checkout);
  const address = document.querySelector(".address");
  const city = document.querySelector(".city");
  const pincode = document.querySelector(".pincode");

  address.textContent = dataCheckout[0].shippingInfo.address;
  city.textContent = dataCheckout[0].shippingInfo.city;
  pincode.textContent = dataCheckout[0].shippingInfo.pincode;
}

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
