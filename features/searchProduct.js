const searchProductInput = document.querySelector(".search-product-input");
const closeBtn = document.querySelector(".btn-close");

searchProductInput.addEventListener("keyup", (e) => {
  let searchValue = e.target.value;
  fetch(`http://localhost:5000/api/product/search/${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      let items = "";
      data.map((item) => {
        star(item.totalrating);

        items += ` <div class="col-md-2 mt-1" onclick=addIdToSingleProduct("${
          item._id
        }")>
                      <div class="card rounded-0 p-2">
                        <img src="/assets/images/${
                          item.images.length == 0
                            ? "ch1.jpg"
                            : item.images[0].url
                        }" class="rounded-0 mt-2" alt="${item.title}" 
                        style="height:120px"/>
                        <div class="card-body p-0 pt-2">
                          <small class="text-success ps-0">${
                            item.title
                          }<br /></small>
                          <small class="text-danger ps-0">$ ${
                            item.price
                          }<br /></small>
                          ${stars}
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
