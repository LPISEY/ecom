const user = localStorage.getItem("cust");
const getUserToken = JSON.parse(user);
const userToken = getUserToken.token;
const userId = getUserToken._id;

getUserOrder();
async function getUserOrder() {
  const response = await fetch(`http://localhost:5000/api/user/order/myorder`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  const data = await response.json();

  if (data.length === 0) {
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

const logout = async () => {
  const response = await fetch("http://localhost:5000/api/user/logout");
  const data = await response.json();
  console.log(data);
};
