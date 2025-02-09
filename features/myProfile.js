const user = localStorage?.getItem("cust");
const getUserToken = JSON.parse(user);
const userToken = getUserToken?.token;
const userId = getUserToken?._id;

document.querySelector(".firstName").textContent = getUserToken.firstname;
document.querySelector(".lastName").textContent = getUserToken.lastname;
document.querySelector(".email").textContent = getUserToken.email;

const updatePassword = document.querySelector(".update-password");

updatePassword.addEventListener("click", () => {
  const oldPassword = document.querySelector(".oldPassword").value;
  const newPassword = document.querySelector(".newPassword").value;
  const oldPasswordError = document.getElementById("oldPasswordError");
  const newPasswordError = document.getElementById("newPasswordError");
  let isValid = true;
  if (oldPassword === "" || oldPassword.length < 6) {
    oldPasswordError.textContent =
      "Please enter a password with at least 6 characters.";
    isValid = false;
  } else {
    oldPasswordError.textContent = "";
    isValid = true;
  }
  if (oldPassword !== newPassword) {
    newPasswordError.textContent = "Password dost not match !";
    isValid = false;
  } else {
    newPasswordError.textContent = "";
    isValid = true;
  }
  if (newPassword === "" || newPassword.length < 6) {
    newPasswordError.textContent =
      "Please enter new password with at least 6 characters.";
    isValid = false;
  } else {
    newPasswordError.textContent = "";
    isValid = true;
  }

  if (isValid) {
    fetch(`http://localhost:5000/api/user/password`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ password: newPassword }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  } else {
    return false;
  }
});
getUserOrder();
async function getUserOrder() {
  const response = await fetch(`http://localhost:5000/api/user/order/myorder`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  const data = await response.json();

  if (!data) {
    document.querySelector(
      ".cart-body"
    ).innerHTML = `<div class="col-md-12 mt-5 text-center">No Data</div>`;
  }

  if (data?.length === 0) {
    document.querySelector(
      ".cart-body"
    ).innerHTML = `<div class="col-md-12 mt-5 text-center">No Data</div>`;
  } else {
    data.map((item) => {
      const date = new Date(item.createdAt);
      const orderDate = date.toLocaleString();

      const items = `<div class="row mt-3 border-bottom border-light-subtle">
                      <div class="col-md-3 text-black-50 text-center">
                        ${orderDate}
                      </div>
                      <div
                        class="col-md-2 text-black-50 text-center"
                      >
                         ${item.orderItems.map((e) => e.product.title)}
                      </div>
                      <div
                        class="col-md-2 text-black-50 text-center"
                      >
                        ${item.orderItems.map((e) => e.product.price)}
                      </div>
                      <div class="col-md-1 text-black-50 text-center">
                         ${item.orderItems.map((e) => e.quantity)}
                      </div>
                      <div class="col-md-2 text-black-50 text-center">
                        ${
                          item.orderItems.map((e) => e.quantity) *
                          item.orderItems.map((e) => e.product.price)
                        }
                      </div>
                      <div class="col-md-2 text-black-50 text-center">
                        ${item.orderStatus}
                      </div>
                    </div>`;
      document.querySelector(".cart-body").innerHTML += items;
    });
  }
}

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
const logout = async () => {
  const response = await fetch("http://localhost:5000/api/user/logout");
  const data = await response.json();
  console.log(data);
};
