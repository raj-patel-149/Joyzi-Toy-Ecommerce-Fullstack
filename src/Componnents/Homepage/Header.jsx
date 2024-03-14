import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser } from "../../Store/UserContext";

import { CgProfile } from "react-icons/cg";
import { BsBlockquoteRight } from "react-icons/bs";
import Menu from "./Menu";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="p-3 header">
      <div className="container">
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="custom-checkbtn">
          <BsBlockquoteRight />
        </label>

        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start responsive">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <img src="Joyzi Logo nbg.png" alt="" className="logo" />
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 hover-style ">
            <li>
              <Link
                to="/home"
                className="nav-link px-2 text-black custom-active"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/productpage"
                className="nav-link px-2 text-black custom-active"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/productpage"
                className="nav-link px-2 text-black custom-active"
              >
                <div className="dropdown ">
                  <button className="matarial-symbol-outlined custom-header-components">
                    Catagories
                  </button>
                  <Menu></Menu>
                </div>
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                className="nav-link px-2 text-black  custom-active"
              >
                <div className="cart">
                  <div className="cart-icon">
                    <FaShoppingCart />
                  </div>
                  <div className="cart-name">Cart</div>
                </div>
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="nav-link px-2 text-black custom-active"
              >
                About Us
              </Link>
            </li>
          </ul>

          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 "
            role="search"
          >
            <input
              type="search"
              className="form-control form-control-dark "
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="text-end">
            <button type="button" className="btn btn-warning">
              <CgProfile /> Welcome , {user ? user.name : "User"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
