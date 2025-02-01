const verticalBtn = document.querySelector(".vertical-btn");
const horizontalBtn = document.querySelector(".horizontal-btn");
const products = document.querySelector(".products");

horizontalBtn.addEventListener("click", () => {
  const product = document.querySelectorAll(".product");
  const cardImgTop = document.querySelectorAll(".card-img-top");
  products.classList.remove("flex-column");
  products.classList.add("flex-row");
  product.forEach((el) => el.classList.remove("row-products"));
  product.forEach((el) => el.classList.add("column-products"));
  product.forEach((el) => el.classList.add("border-1"));
  product.forEach((el) => el.classList.remove("border-0"));
  product.forEach((el) => (el.style.width = "16.1rem"));
  cardImgTop.forEach((el) => (el.style.width = "100%"));
  if (products.classList.contains("flex-row")) {
    document
      .querySelectorAll(".product-description")
      .forEach((e) => (e.style.display = "none"));
    document
      .querySelectorAll(".card-info")
      .forEach((e) => e.classList.remove("ms-3"));
  }
});
verticalBtn.addEventListener("click", () => {
  const product = document.querySelectorAll(".product");
  const cardImgTop = document.querySelectorAll(".card-img-top");
  products.classList.remove("flex-row");
  products.classList.add("flex-column");
  product.forEach((el) => el.classList.remove("column-products"));
  product.forEach((el) => el.classList.add("row-products"));
  product.forEach((el) => el.classList.remove("border-1"));
  // product.forEach((el) => el.classList.add("border-0"));
  product.forEach((el) => (el.style.width = "100%"));
  cardImgTop.forEach((el) => (el.style.width = "20%"));
  if (products.classList.contains("flex-column")) {
    document
      .querySelectorAll(".product-description")
      .forEach((e) => (e.style.display = "block"));
    document
      .querySelectorAll(".card-info")
      .forEach((e) => e.classList.add("ms-3"));
  }
});
