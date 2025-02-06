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
wishLists();
async function wishLists() {
  const user = localStorage.getItem("cust");
  const getUserToken = JSON.parse(user);
  const userToken = getUserToken.token;
  try {
    const response = await fetch(`http://localhost:5000/api/user/wishlist`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = await response.json();
    data.wishlist.map((item) => {
      star(item.totalrating);
      const id = item._id;
      const image = item.images[0].url;
      const title = item.title;
      const brand = item.brand.title;
      const price = item.price;
      const description = item.description;
      productCard(id, image, title, brand, price, description, star);
    });

    document.querySelector(".wishlist").innerHTML = items;
  } catch (error) {
    throw new Error(error);
  }
}
