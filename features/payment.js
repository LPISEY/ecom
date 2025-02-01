const user = localStorage?.getItem("cust");
const getUserToken = JSON.parse(user);
const userToken = getUserToken?.token;
const paymentBtn = document.querySelector(".payment-btn");

paymentBtn.addEventListener("click", () => {
  let cardNumber = document.forms["paymentForm"]["cardNumber"].value;
  let cardHolderName = document.forms["paymentForm"]["cardHolderName"].value;
  let expiry = document.forms["paymentForm"]["expiry"];

  const cardNumberError = document.getElementById("cardNumberError");
  const cardHolderNameError = document.getElementById("cardHolderNameError");
  const expiryError = document.getElementById("expiryError");

  let isValid = true;
  if (cardNumber === "") {
    cardNumberError.textContent = "Please enter credit card number.";
    isValid = false;
  } else {
    cardNumberError.textContent = "";
    isValid = true;
  }
  if (cardHolderName === "") {
    cardHolderNameError.textContent = "Please enter card holder name.";
    isValid = false;
  } else {
    cardHolderNameError.textContent = "";
    isValid = true;
  }
  if (expiry === "") {
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
              cardNumber: cardNumber,
              cardHolderName: cardHolderName,
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

const getShippingAddress = async () => {
  const checkout = localStorage.getItem("checkout");
  const dataCheckout = JSON.parse(checkout);
  const shipping = `
                    <div class="mb-3">
                        <h4 class="text-center">Shipping Address</h4>
                    </div>
                    <div class="col-md-6 mb-3">First Name</div>
                    <div class="col-md-6 mb-3">${dataCheckout[0].shippingInfo.firstname}</div>
                    <div class="col-md-6 mb-3">Larst Name</div>
                    <div class="col-md-6 mb-3">${dataCheckout[0].shippingInfo.lastname}</div>
                    <div class="col-md-6 mb-3">Address</div>
                    <div class="col-md-6 mb-3">${dataCheckout[0].shippingInfo.address}</div>
                    <div class="col-md-6 mb-3">City</div>
                    <div class="col-md-6 mb-3">${dataCheckout[0].shippingInfo.city}</div>
                    <div class="col-md-6 mb-3">Pin Code</div>
                    <div class="col-md-6 mb-3">${dataCheckout[0].shippingInfo.pincode}</div>`;
  document.querySelector(".shipping").innerHTML = shipping;
};
getShippingAddress();

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
