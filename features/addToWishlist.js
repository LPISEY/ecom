const addToWishList = (id) => {
  const user = localStorage?.getItem("cust");
  const getUserToken = JSON.parse(user);
  const userToken = getUserToken?.token;
  if (!userToken) window.location = "login.html";
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
      if (data.message) alert("Token has been expired. Please sign in again");
    })
    .catch((e) => console.log(e));
};
