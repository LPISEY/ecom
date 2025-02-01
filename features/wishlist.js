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
      let stars = "";
      data.wishlist?.map((item) => {
        switch (item.totalrating) {
          case 0:
            stars =
              '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
            break;
          case 1:
            stars =
              '<i class="fa fa-star starRated"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
            break;
          case 2:
            stars =
              '<i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
            break;
          case 3:
            stars =
              '<i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
            break;
          case 4:
            stars =
              '<i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star"></i>';
            break;
          case 5:
            stars =
              '<i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i>';
            break;
          default:
            break;
        }
        const _id = item._id;
        const items = `<div class="card product border-1 column-products" id=${
          item._id
        }>
          <img
            src="/assets/images/${
              item.images.length == 0 ? "ch1.jpg" : item.images
            }"
            class="card-img-top rounded-0 mt-2"
            alt="${item.title}"
          />
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
                role="group"
                aria-label="Basic mixed styles example"
              >
                <a type="button" class="addToWishList btn btn-outline-danger rounded-start-0 
                id="${item._id}" onclick=addToWishList("${_id}")>
                  <i class="fa fa-heart"></i>
                </a>
                <a href="#" type="button" class="btn btn-outline-info rounded-end-0" id="${
                  item._id
                }" onclick=tempProductId("${_id}")>
                  <i class="fa fa-eye"></i>
                </a>
              </div>
            </div>
          </div>
        </div>`;
        document.querySelector(".wishlist").innerHTML += items;
      });
    })
    .catch((e) => console.log(e));
}
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
      if (data) window.location = "wishlist.html";
    })
    .catch((e) => console.log(e));
};
