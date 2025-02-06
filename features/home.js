featuredProducts();
async function featuredProducts() {
  try {
    const response = await fetch(`http://localhost:5000/api/product/featured`);
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

    document.querySelector(".products").innerHTML = items;
  } catch (error) {
    throw new Error(error);
  }
}
