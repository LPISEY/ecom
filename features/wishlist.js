const addToWishList = (id) => {
  const user = localStorage.getItem("cust");
  const getUserToken = JSON.parse(user);
  const userToken = getUserToken.token;

  fetch("http://localhost:5000/api/product/wishlist", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      prodId: id,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      userWishList();
    })
    .catch((e) => console.log(e));
};

const addToCart2 = (productId, price) => {
  const user = localStorage?.getItem("cust");
  const getUserToken = JSON.parse(user);
  const userToken = getUserToken?.token;
  if (!userToken) window.location = "login.html";

  const item = {
    productId: productId,
    quantity: 1,
    price: price,
  };

  fetch("http://localhost:5000/api/user/add-to-cart", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const getCart = localStorage?.getItem("cart");
        let cart = getCart == null ? [] : JSON.parse(getCart);
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        getTotal();
      }
    })
    .catch((e) => console.log(e));
};
userWishList();
function userWishList() {
  const user = localStorage.getItem("cust");
  const getUserToken = JSON.parse(user);
  const userToken = getUserToken.token;

  fetch("http://localhost:5000/api/user/wishlist", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let items = "";
      data.wishlist?.map((item) => {
        const _id = item._id;

        star(item.totalrating);

        items += `<div class="card product border-1 column-products" id=${
          item._id
        }>
          <img
            src="/assets/images/${
              item.images.length == 0 ? "ch1.jpg" : item.images
            }"
            class="card-img-top rounded-0 mt-2"
            alt="${item.title}"
          />
          <a href="#" class="btn btn-danger rounded-5 liked-btn addToWishList"  onclick=addToWishList("${_id}")>
            <i class="fa fa-heart "></i>
          </a>
          <div class="card-info">
            <div class="card-body ps-0">
              <h6 class="card-title product-title text-primary">
                ${item.title}
              </h6>
              <small class="product-description text-black-50">${
                item.description
              }</small>
            </div>
            <ul class="list-group list-group-flush ">
              <li class="border-0 list-group-item brand-name text-danger ps-0">
                ${item.brand.title}
              </li>
              <li class="border-0 list-group-item ps-0 star">
                ${stars}
              </li>
              <li class="border-0 list-group-item text-success ps-0 product-price">$ ${
                item.price
              }</li>
            </ul>
            <div
              class="card-body  d-flex justify-content-center align-items-center"
            >
              <div
                        class="btn-group"
                      >
                        <a type="button" class="btn btn-outline-success actions rounded-0"
                          onclick=addToCart2("${item._id}","${item.price}")>
                          <i class="fa fa-cart-arrow-down "></i> Add To Cart
                        </a>
                        <a href="#" type="button" class="btn btn-outline-info actions rounded-0"
                        id="${item._id}" onclick=tempProductId("${_id}")>
                          <i class="fa fa-info-circle"></i> More Details
                        </a>
                      </div>
            </div>
          </div>
        </div>`;
      });
      document.querySelector(".wishlist").innerHTML = items;
    })
    .catch((e) => console.log(e));
}
