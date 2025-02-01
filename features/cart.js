const user = localStorage.getItem("cust");
const getUserToken = JSON.parse(user);
const userToken = getUserToken.token;

const increaseQuantity = async (id, count) => {
  count++;

  await fetch(`http://localhost:5000/api/user/cart/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      quantity: count,
    }),
  })
    .then((response) => {
      if (response.ok) {
        getUserCart();
        getTotal();
      }
    })
    .catch((e) => console.log(e));
};

const decreaseQuantity = async (id, count) => {
  count--;

  await fetch(`http://localhost:5000/api/user/cart/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      quantity: count,
    }),
  })
    .then((response) => {
      if (response.ok) {
        getUserCart();
        getTotal();
      }
    })
    .catch((e) => console.log(e));
};

const removeProductFromCart = async (id) => {
  await fetch(`http://localhost:5000/api/user/cart/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        getUserCart();
        getTotal();
      }
    })
    .catch((e) => console.log(e));
};

getUserCart();
async function getUserCart() {
  const response = await fetch(`http://localhost:5000/api/user/cart`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  const data = await response.json();

  if (data.length === 0) {
    document.querySelector(
      ".cart-body"
    ).innerHTML = `<div class="col-md-12 mt-5 text-center">No Data</div>`;
    document.querySelector(".total").textContent = `Total $ 0.00`;
  } else {
    let items = "";
    let total = 0;
    data.map((item) => {
      const subtotal = item.quantity * item.price;
      total += subtotal;

      items += `    <div class="row mt-3 border-bottom border-light-subtle">
                      <div class="col-md-4 text-black-50">
                        <div class="card row-products border-0">
                          <div class="card-img">
                            <img
                              src="/assets/images/ch1.jpg"
                              class="card-img-top rounded-0 mt-2"
                              alt="Lenovo Thinkpad 555"
                            />
                          </div>
                          <div class="card-body">
                            <p class="text-primary">
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
                        </div>
                      </div>
                      <div
                        class="col-md-3 d-flex justify-content-center align-items-center"
                      >
                        $ ${item.price}
                      </div>
                      <div
                        class="col-md-2 d-flex justify-content-center align-items-center"
                      >
                        <div class="input-group" style="height: 20px">
                          <span
                            class="input-group-text rounded-0 border-0 decreaseQuantity"
                            onclick=decreaseQuantity("${item._id}","${
        item.quantity
      }")
                            style="height: 20px"
                            ><i class="fa fa-minus"></i
                          ></span>
                          <input
                            type="text"
                            class="form-control text-center border-0 updateQuantity"
                            style="height: 20px"
                            value="${item.quantity}"
                          />
                          <span
                            class="input-group-text rounded-0 border-0 increaseQuantity"
                            onclick=increaseQuantity("${item._id}","${
        item.quantity
      }")
                            style="height: 20px"
                            ><i class="fa fa-plus"></i
                          ></span>
                        </div>
                      </div>
                      <div class="col-md-2 d-flex justify-content-end align-items-center">
                        $ ${item.price * item.quantity}
                      </div>
                      <div class="col-md-1 d-flex justify-content-end align-items-center">
                        <i class="fa fa-times" onclick=removeProductFromCart("${
                          item._id
                        }")></i>
                      </div>
                    </div>`;
    });
    document.querySelector(".cart-body").innerHTML = items;
    document.querySelector(".total").textContent = `Total $ ${total}`;
  }
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

const checkoutBtn = document.querySelector(".checkout-btn");
checkoutBtn.addEventListener("click", () => {
  fetch(`http://localhost:5000/api/user/cart`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        alert("Please make an order");
      } else {
        window.location = "checkout.html";
      }
    })
    .catch((e) => console.log(e));
});
