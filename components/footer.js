const footer = `<div class="col-md-3">
                    <h4>Contact US</h4>
                    <p>
                        #271, Trea Village, Stueng Mean Chey Commun, Mean Chey District,
                        Phnom Penh, Cambodia
                    </p>
                    <p><i class="fa fa-phone"></i> (+855)-71-855-1103</p>
                    <p><i class="fa fa-envelope"></i> lampisey@gmail.com</p>
                    <div
                        class="btn-group"
                        role="group"
                        aria-label="Basic mixed styles example"
                    >
                        <button
                        type="button"
                        class="btn btn-outline-warning rounded-start-0"
                        >
                        <i class="fa fa-facebook"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger">
                        <i class="fa fa-instagram"></i>
                        </button>
                        <button type="button" class="btn btn-outline-info">
                        <i class="fa fa-twitter"></i>
                        </button>
                        <button type="button" class="btn btn-outline-success rounded-end-0">
                        <i class="fa fa-linkedin"></i>
                        </button>
                    </div>
                    </div>
                    <div class="col-md-3">
                    <h4>Information</h4>
                    <ul>
                        <li>
                        <a href="#">
                            <i class="fa fa-chevron-circle-right"></i> Privacy Policy
                        </a>
                        </li>
                        <li>
                        <a href="#">
                            <i class="fa fa-chevron-circle-right"></i> Terms & Conditions
                        </a>
                        </li>
                        <li>
                        <a href="#">
                            <i class="fa fa-chevron-circle-right"></i> Refund Policy
                        </a>
                        </li>
                        <li>
                        <a href="#">
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
                        <li>
                        <a href="shipping.html">Create Shipping </a>
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
                        class="form-control"
                        placeholder="Your Email Address ..."
                        />
                        <span class="input-group-text">Subscribe</span>
                    </div>
                </div>
                <div class="col-md-12 text-center pt-2 text-white mt-3" style="border-top: 1px solid #3b4149;font-size:0.9em">© 2025 Power by Online Shop.</div>`;
document.querySelector(".footer").innerHTML += footer;
const tempProductId = (id) => {
  localStorage.setItem("productId", JSON.stringify(id));
  window.location = "viewproduct.html";
};
