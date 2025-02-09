const categories = document.querySelector(".categories");
const category = document.querySelectorAll(".category");
const productPanel = document.querySelector(".productPanel");
const test = document.querySelector(".test");
const closeProductPanel = document.querySelector(".closeProductPanel");

const getProductByCategory = async (cid) => {
  const response = await fetch(
    `http://localhost:5000/api/product/category/${cid}`,
    {
      headers: { "content-type": "application/json" },
    }
  );
  const data = await response.json();
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
                        }" class="rounded-0 mt-2 " alt="${item.title}" />
                        <div class="card-body p-0  pt-2">
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
  if (items == "") {
    document.querySelector(".category-content").innerHTML =
      "<p class='text-center text-dark'>No Items</p>";
  } else {
    document.querySelector(".category-content").innerHTML = items;
  }
  closeProductPanel.addEventListener("click", () => {
    document.querySelector(".category-content").innerHTML = "";
  });
};

getCategory();
async function getCategory() {
  const response = await fetch(`http://localhost:5000/api/category`);
  const data = await response.json();
  let items = "";
  data.map((cate) => {
    const cid = cate._id;
    items += ` <li onclick=getProductByCategory("${cid}") data-bs-toggle="modal"
                    data-bs-target="#categoryProductModal">
                  <a class="dropdown-item ">${cate.title}</a>
                </li>`;
  });
  document.querySelector(".categories").innerHTML = items;
}
