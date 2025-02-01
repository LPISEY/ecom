const searchProductInput = document.querySelector(".search-product-input");
const closeBtn = document.querySelector(".btn-close");

searchProductInput.addEventListener("keyup", (e) => {
  let searchValue = e.target.value;
  fetch(`http://localhost:5000/api/product/search/${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      let items = "";
      data.map((item) => {
        items += ` <div class="col-md-2 mt-1" onclick=tempProductId("${item._id}")>
                          <div class="card rounded-0 p-2">
                              <img src="/assets/images/ch1.jpg" class="rounded-0 mt-2" alt="" />
                              <div class="card-body">
                                  <small>${item.title}</small>
                              </div>
                          </div>
                      </div>`;
      });
      document.querySelector(".search-content").innerHTML = items;
      closeBtn.addEventListener("click", () => {
        searchProductInput.value = "";
        document.querySelector(".search-content").innerHTML = "";
      });
    })
    .catch((e) => console.log(e));
});
