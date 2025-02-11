ourShop();
async function ourShop() {
  try {
    const response = await fetch(`http://localhost:5000/api/product/ourshop/`);
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
      if (data.message) {
        alert("Token has been expired. Please sign in again");
      } else {
        const getCart = localStorage?.getItem("cart");
        let cart = getCart == null ? [] : JSON.parse(getCart);
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        getTotal();
      }
    })
    .catch((e) => console.log(e));
};
