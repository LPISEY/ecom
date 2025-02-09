const getProductId = localStorage.getItem("id");
const productId = JSON.parse(getProductId);

const getSingleProduct = async () => {
  let items = "";
  let numberRater = 0;
  await fetch(`http://localhost:5000/api/product/ui/${productId}`)
    .then((response) => response.json())
    .then((item) => {
      numberRater = item.rating.length;
      star(item.totalrating);

      items += `<div class="card-img" >
                  <img src="/assets/images/${
                    item.images.length == 0 ? "ch1.jpg" : item.images[0].url
                  }" class="card-img-top rounded-0 mt-2" alt=${item.title}"/>
                </div>
                <div class="card-info" >
                  <div class="card-body" >
                    <h4 class="border-bottom border-light-subtle card-title product-title text-primary">
                      ${item.title}
                    </h4>
                  </div>
                  <ul class="list-group list-group-flush" >
                    <li class="border-bottom border-light-subtle list-group-item text-success fs-4 product-price">
                      $ ${item.price}
                    </li>
                    <li class="border-0 list-group-item brand-name text-danger">
                      ${item.brand.title}
                    </li>
                    <li class="border-0 list-group-item">
                        ${stars}
                        <span class="totalNumberReviews">${numberRater} Reviews</span>
                    </li>
                    <li class="border-0 list-group-item type-name">
                      Type : ${item.category.title}
                    </li>
                    <li class="border-0 list-group-item category-name">
                      Category : ${item.category.title}
                    </li>
                    <li class="border-0 list-group-item tag-name">
                      Tags : ${item.tags.map((t) => t.tag).join(" , ")}
                    </li>
                    <li class="border-0 list-group-item vailable-stock">
                      Availability : ${item.quantity} in stock
                    </li>
                    <li class="border-0 list-group-item size-name">
                      <div class="row">
                        <label class="col-sm-2 col-form-label">Sizes : </label>
                        <div class="col-sm-3">
                          <select class="form-select border-0 size">
                            ${item.size.map((s) => {
                              return `<option value="${s.id}">${s.size}</option>`;
                            })}
                          </select>
                        </div>
                      </div>
                    </li>
                    <li class="border-0 list-group-item color-name">
                      <div class="row">
                        <label class="col-sm-2 col-form-label">Colors : </label>
                        <div class="col-sm-3">
                          <select class="form-select border-0 color">
                            ${item.color.map((c) => {
                              return `<option value="${c.id}">${c.color}</option>`;
                            })}
                          </select>
                        </div>
                      </div>
                    </li>
                    <li class="border-0 list-group-item">
                        <div class="row">
                          <label class="col-sm-2 col-form-label">Quality : </label>
                          <div class="col-sm-3">
                            <input type="text" class="form-control rounded-5 text-center quantity" />
                          <div class="form-text text-danger " id="quantityError"></div>
                          </div>
                          <div class="col-sm-3">
                            <a
                              type="button"
                              class="btn rounded-5 bg-dark text-white submit-btn"
                              onclick=addToCart("${item._id}","${item.price}")>
                              Add To Cart
                            </a>
                          </div>
                        </div>
                    </li>
                    <li class="border-0 list-group-item mt-3 mb-3">
                        <div class="row">
                          <div class="col-sm-3">
                            <a href="#">
                              <i class="fa fa-heart text-black-50" onclick=addToWishList("${
                                item._id
                              }")>Add To Wishlist</i>
                            </a>
                          </div>
                        </div>
                    </li>
                    <li class="border-0 list-group-item">
                        <p>Shipping & Returns :</p>
                        <p class="text-black-50">
                          Free shipping and returns available on all orders! We ship
                          all US domestic orders whithi5-10 business days!
                        </p>
                    </li>
                    <li class="border-0 list-group-item">
                        <p>Descriptions :</p>
                        <p class="text-black-50">
                          ${item.description}
                        </p>
                    </li>
                  </ul>
              </div>`;
      getTotal();
    })
    .catch((e) => console.log(e));

  document.querySelector(".view-product").innerHTML = items;
  document.querySelector(
    ".totalRatingStar"
  ).innerHTML = `${stars} (Based on ${numberRater} Reviews)`;
};
getSingleProduct();

youMayLikes();
async function youMayLikes() {
  try {
    const response = await fetch(
      `http://localhost:5000/api/product/youMayLike`
    );
    const data = await response.json();
    data.map((item) => {
      star(item.totalrating);
      const id = item._id;
      const image = item.images[0].url;
      const title = item.title;
      const brand = item.brand.title;
      const price = item.price;
      const description = item.description;
      productCard(id, image, title, brand, price, description, star);
    });

    document.querySelector(".youMayLike").innerHTML = items;
  } catch (error) {
    throw new Error(error);
  }
}

let starRate = document.getElementsByClassName("starRate");
let starNumber = 0;

function starRating(n) {
  for (let i = 0; i < n; i++) {
    if (n == 1) cls = "one";
    else if (n == 2) cls = "two";
    else if (n == 3) cls = "three";
    else if (n == 4) cls = "four";
    else if (n == 5) cls = "five";
    starRate[i].classList.add(cls);
  }
  starNumber = n;
}

const submitReviewBtn = document.querySelector(".submit-review-btn");
const comment = document.getElementsByClassName("comment");
const commentError = document.getElementById("commentError");
const starError = document.getElementById("starError");
removeTextAreaWhiteSpace();
function removeTextAreaWhiteSpace() {
  var textarea = document.getElementById("comment");
  textarea.value = textarea.value.replace(/^\s*|\s*$/g, "");
}

submitReviewBtn.addEventListener("click", async () => {
  const user = localStorage?.getItem("cust");
  const getUserId = JSON.parse(user);
  const userToken = getUserId?.token;
  if (!userToken) window.location = "login.html";

  let isValid = true;
  if (starNumber === 0) {
    starError.textContent = "Please choose at least one star .";
    isValid = false;
  } else {
    starError.textContent = "";
    isValid = true;
  }
  if (comment.comment.value === "") {
    commentError.textContent = "Please write a comment .";
    isValid = false;
  } else {
    commentError.textContent = "";
    isValid = true;
  }

  if (isValid) {
    await fetch(`http://localhost:5000/api/product/rating`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        star: starNumber,
        comment: comment.comment.value,
        prodId: productId,
      }),
    })
      .then((response) => response.json())
      .then((data) => getRatingProduct())
      .catch((e) => console.log(e));
  } else {
    return false;
  }
});

getRatingProduct();
function getRatingProduct() {
  let items = "";
  fetch(`http://localhost:5000/api/product/ui/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      data?.rating?.map((item) => {
        star(item.star);

        items += `<li class="border-bottom border-light-subtle list-group-item">
                    <p>
                      ${item.postedbyname}:
                      ${stars}
                    </p>
                    <p class="text-black-50">
                      ${item.comment}
                    </p>
                  </li>`;
      });

      document.querySelector(".userReview").innerHTML = items;
    })
    .catch((e) => console.log(e));
}
