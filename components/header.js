const cust = localStorage?.getItem("cust");
const username = JSON.parse(cust);

const header = `<nav class="row topNavBar">
                    <div class="col-md-6 d-flex justify-content-start align-items-center">
                        <small class="text-white text-center">
                        Free Shipping Over $100 Free Returns
                        </small>
                    </div>
                    <div class="col-md-6 d-flex justify-content-end align-items-center">
                        <small class="text-white text-center">
                        Phone : (+855)-71-855-110-3
                        </small>
                    </div>
                </nav>
                <nav class="row nav-bar">
                    <div
                        class="col-md-6 d-flex justify-content-center align-items-center"
                    >
                        <div class="col-md-4">
                            <h4 class="text-white">Online Shop</h4>
                        </div>
                        <div
                        class="col-md-8 d-flex justify-content-center align-items-center"
                        >
                            <div class="input-group">
                                <input type="text" class="form-control rounded-0" data-bs-toggle="modal"
                    data-bs-target="#searchProductModal"/>
                                <span class="input-group-text rounded-0" data-bs-toggle="modal"
                    data-bs-target="#searchProductModal"
                                ><i class="fa fa-search"></i
                                ></span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="col-md-6 d-flex justify-content-center align-items-center"
                    >

                        <div class="col-md-4 text-center">
                            <a href="${
                              username != null ? "wishlist.html" : "login.html"
                            }" >
                                <div
                                    class="row d-flex justify-content-center align-items-center"
                                >
                                    <div
                                        class="col-md-6 d-flex justify-content-center align-items-center"
                                    >
                                        <i class="fa fa-heart nav-bar-icons"></i>
                                        <span class="nav-bar-icons-text">Favourite Wishlist</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4 text-center">
                            <a href="${
                              username != null ? "myprofile.html" : "login.html"
                            }">
                                <div
                                    class="row d-flex justify-content-center align-items-center"
                                >
                                    <div
                                        class="col-md-12 d-flex justify-content-center align-items-center"
                                    >
                                        <i class="fa fa-user nav-bar-icons"></i>
                                        <span class="nav-bar-icons-text">
                                            ${
                                              username != null
                                                ? "WELCOME<br />" +
                                                  username?.firstname +
                                                  " " +
                                                  username?.lastname
                                                : "Login <br />My Account"
                                            }
                                        </span>
                                    
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4 text-center">
                            <a href="${
                              username != null ? "cart.html" : "login.html"
                            }">
                                <div
                                    class="row d-flex justify-content-center align-items-center"
                                >
                                    <div
                                        class="col-md-12 d-flex justify-content-center align-items-center"
                                    >
                                        <i class="fa fa-opencart nav-bar-icons"></i>
                                        <div>
                                        <small class="totalItems nav-bar-icons-text"></small><br />
                                        <small class="totalPrice nav-bar-icons-text"></small>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </nav>
                <nav class="row navbar navbar-expand-lg" >
                    <div class="container-fluid">
                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav">
                                <li class="nav-item dropdown">
                                    <a
                                        class="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i class="fa fa-list"></i> SHOP CATEGORIES
                                    </a>
                                    <ul class="dropdown-menu categories">
                                        
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="index.html">HOME</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="ourshop.html">OUR SHOP</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="contact.html">CONTACT US</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="about.html">ABOUT US</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div class="row test">
                    <div class="col-md-12">
                        <i class="fa fa-times closeProductPanel"></i>
                    </div>
                    <div class="row productPanel"></div>
                </div>`;

document.querySelector(".header").innerHTML += header;

getTotal();
async function getTotal() {
  const user = localStorage?.getItem("cust");
  const getUserToken = JSON.parse(user);
  const userToken = getUserToken?.token;

  if (!userToken) {
    document.querySelector(".totalItems").textContent = "0";
    document.querySelector(".totalPrice").textContent = "$ 0.00";
  } else {
    const response = await fetch(`http://localhost:5000/api/user/cart`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = await response.json();

    let totalQty = 0;
    let totalPrice = 0;

    data.map((item) => {
      totalQty += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    document.querySelector(".totalItems").textContent = totalQty;
    document.querySelector(".totalPrice").textContent = "$ " + totalPrice;
  }
}
