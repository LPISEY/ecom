const footer = `<div class="col-md-3">
                    <h4>Contact US</h4>
                    <p>
                        #271, Trea Village, Stueng Mean Chey Commun, Mean Chey District,
                        Phnom Penh, Cambodia
                    </p>
                    <p><i class="fa fa-phone"></i> (+855)-71-855-1103</p>
                    <p><i class="fa fa-envelope"></i> lampisey@gmail.com</p>
                    <button
                        type="button"
                        class="btn btn-outline-warning btn-sm"
                    >
                        <i class="fa fa-facebook-square"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm">
                        <i class="fa fa-instagram"></i>
                    </button>
                    <button type="button" class="btn btn-outline-info btn-sm">
                        <i class="fa fa-twitter"></i>
                    </button>
                    <button type="button" class="btn btn-outline-success btn-sm">
                        <i class="fa fa-linkedin"></i>
                    </button>
                    </div>
                    <div class="col-md-3">
                    <h4>Information</h4>
                    <ul>
                        <li>
                        <a href="privacypolicy.html">
                            <i class="fa fa-chevron-circle-right"></i> Privacy Policy
                        </a>
                        </li>
                        <li>
                        <a href="termsandcondition.html">
                            <i class="fa fa-chevron-circle-right"></i> Terms & Conditions
                        </a>
                        </li>
                        <li>
                        <a href="refundpolicy.html">
                            <i class="fa fa-chevron-circle-right"></i> Refund Policy
                        </a>
                        </li>
                        <li>
                        <a href="shippingpolicy.html">
                            <i class="fa fa-chevron-circle-right"></i> Shipping Policy
                        </a>
                        </li>
                    </ul>
                    </div>
                    <div class="col-md-3">
                    <h4>Account</h4>
                    <ul>
                        <li>
                        <a href="login.html">Login Account </a>
                        </li>
                        <li>
                        <a href="signup.html">Register Account </a>
                        </li>
                    </ul>
                    </div>
                    <div class="col-md-3">
                    <h4 class="text-center">
                        <i class="fa fa-send-o"></i> Sign up for Newsltter
                    </h4>
                    <div class="input-group">
                        <input
                        type="text"
                        class="form-control rounded-0"
                        placeholder="Your Email Address ..."
                        />
                        <span class="input-group-text rounded-0">Subscribe</span>
                    </div>
                </div>
                <div class="col-md-12 text-center pt-2 text-white mt-3" style="border-top: 1px solid #3b4149;font-size:0.9em">© 2025 Power by Online Shop.</div>
                <div
                    class="modal fade"
                    id="searchProductModal"
                    tabindex="-1"
                    aria-labelledby="searchProductModalLabel"
                    aria-hidden="true"
                >
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content rounded-0">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="searchProductModalLabel"></h1>
                                <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                ></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <input
                                        type="text"
                                        class="form-control border-0 rounded-0 border-bottom border-purple-subtle search-product-input"
                                        placeholder="Search Product Here ..."
                                        />
                                    </div>
                                </div>
                                <div class="row mt-2 search-content"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div
                    class="modal fade"
                    id="categoryProductModal"
                    tabindex="-1"
                    aria-labelledby="categoryProductModalLabel"
                    aria-hidden="true"
                >
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content rounded-0">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="categoryProductModalLabel"></h1>
                                <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                ></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-12">

                                    </div>
                                </div>
                                <div class="row mt-2 category-content"></div>
                            </div>
                        </div>
                    </div>
                </div>`;
document.querySelector(".footer").innerHTML += footer;
const addIdToSingleProduct = (id) => {
  localStorage.setItem("id", JSON.stringify(id));
  window.location = "singleproduct.html";
};
