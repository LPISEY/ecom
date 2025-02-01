const addToCart = (productId, price) => {
  const user = localStorage?.getItem("cust");
  const getUserToken = JSON.parse(user);
  const userToken = getUserToken?.token;

  const quantityError = document.getElementById("quantityError");
  let color = document.querySelector(".color");
  let size = document.querySelector(".size");
  let quantity = document.querySelector(".quantity");
  if (!userToken) window.location = "login.html";
  if (quantity.value == "")
    quantityError.textContent = "Please input a quantity";

  const item = {
    productId: productId,
    color: color.value,
    size: size.value,
    quantity: quantity.value,
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
        let cart = JSON.parse(getCart);
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        getTotal();
      }
    })
    .catch((e) => console.log(e));
};
