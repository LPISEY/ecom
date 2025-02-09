let items = "";
const productCard = (id, image, title, brand, price, description) => {
  items += `<div class="card product border-1 column-products productCard">
              <img
                src="/assets/images/${image}"
                      class="card-img-top rounded-0 mt-2 mb-2"
                      alt="${title}"
              />
              <a href="#" class="btn btn-dark rounded-5 d-flex justify-center align-items-center liked-btn addToWishList"  onclick=addToWishList("${id}")>
                  <i class="fa fa-heart "></i>
              </a>
              <div class="card-info">
                <div class="card-body ps-0">
                  <h6 class="card-title product-title text-dark">
                    ${title}
                  </h6>
                  <span class="product-description text-black-50">
                  ${description}
                  </span>
                </div>
                <span class="text-danger ps-0">
                  $ ${price}
                </span>
                <br />
                ${stars}<br />
                <small class="text-info ps-0">
                  ${brand}
                </small>
                <div class="card-body p-0 pt-3 pb-2 d-flex justify-content-center align-items-center">
                  <div class="btn-group">
                    <a type="button" class="btn btn-outline-success actions rounded-0"
                      onclick=addToCart2("${id}","${price}")>
                      <i class="fa fa-cart-arrow-down "></i> Add To Cart
                    </a>
                    <a href="#" type="button" class="btn btn-outline-info actions rounded-0"
                      id="${id}" onclick=addIdToSingleProduct("${id}")>
                      <i class="fa fa-info-circle"></i> More Details
                    </a>
                  </div>
                </div>
              </div>
            </div>`;
};
