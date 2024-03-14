import DataFetcher from "../../Storage/DataFetcher";
import { useSelector } from "react-redux";
import BestSellingProductList from "../Homepage/BestSellingProductList";
import ProductList from "../Homepage/ProductList";
import { GoStarFill } from "react-icons/go";
import { IoLocationSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { CartAction } from "../../Store/Cart";
import { Link } from "react-router-dom";

const ClickProduct = () => {
  const jsonData = DataFetcher();
  const { clickedProductId } = useSelector((store) => store.Cart);

  const product =
    jsonData && jsonData.items[0].find((item) => item.id === clickedProductId);

  const dispatch = useDispatch();

  const handleAddToCartBtn = (id, item) => {
    dispatch(CartAction.addItem({ id }));
    alert(`${item.name} was added to cart`);
  };

  return (
    <>
      <div className="container col-xxl-8 px-4 py-5 custom-box-shadow top-container ">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-lg-6">
            <h1 className="display45 fw-bold text-body-emphasis lh-1 mb-3">
              {product && product.name}
            </h1>
            <p className="product-dis">{product && product.description}</p>
            <p className="star">
              {product &&
                [...Array(Math.floor(product.rating.stars))].map((_, index) => (
                  <GoStarFill key={index} />
                ))}
            </p>
            <p className="discount-price">
              <span className="discount-percentage">-30%</span>₹
              {product && product.price}
            </p>
            <p className="lead ">
              M.R.P.: <span className="real-price">₹2,895</span>
            </p>
            <p className="lead com-text">Inclusive of all taxes</p>
            <p className="lead com-text">
              EMI starts at ₹98. No Cost EMI available
              <a href="" className="link">
                EMI options
              </a>
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                className="btn btn-primary"
                fdprocessedid="ok5qf7"
              >
                Quantity:
              </button>
              <Link to="/buyNow">
                <button
                  type="button"
                  className="btn btn-warning btn-lg px-4 me-md-2"
                  fdprocessedid="ilhjz"
                >
                  Buy Now
                </button>
              </Link>

              <button
                type="button"
                className="btn btn-outline-warning btn-lg px-4 addCart"
                fdprocessedid="gj3n3"
                onClick={() => handleAddToCartBtn(product.id, product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={product && product.image}
              className="d-block mx-lg-auto img-fluid custom-box-shadow"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>

          {/* Product Details */}

          <div className="card ">
            <h5 className="card-header">Product Details</h5>
            <div className="card-body">
              <ul>
                <li>
                  <b>Color:</b> Red
                </li>
                <li>
                  <b>Size:</b> 1:18 Scale
                </li>
                <li>
                  <b>Material:</b> Plastic
                </li>
                <li>
                  <b>Battery Type:</b> Rechargeable Lithium-ion
                </li>
                <li>
                  <b>Controller Type:</b> Wireless Remote Control
                </li>
                <li>
                  <b>Features:</b> Forward, backward, left turn, right turn, and
                  360-degree spin capabilities
                </li>
                <li>
                  <b>Recommended Age:</b> 8 years and up
                </li>
                <li>
                  <b>Package Includes:</b> Remote-controlled car, wireless
                  remote control, rechargeable battery, USB charging cable, user
                  manual
                </li>
              </ul>
            </div>
            <div className="card-footer text-body-secondary">
              Don't miss the opprtunity....
            </div>
          </div>

          {/* Delivery */}

          <div className="card ">
            <h5 className="card-header">Delivery</h5>
            <div className="card-body">
              <h5 className="card-title">
                FREE delivery Wednesday, 6 March. Details
              </h5>
              <p className="card-text">
                Or fastest delivery Tomorrow, 5 March. Order within 15 hrs 53
                mins. Details
              </p>
              <p className="card-text">
                <IoLocationSharp />
                Deliver to Patel - Bhavnagar 364001‌
              </p>
              <a href="#" className="btn btn-primary">
                Use Current Location
              </a>
            </div>
          </div>

          {/* Offer */}

          <div className="card ">
            <h5 className="card-header">Offers</h5>
            <div className="card-body d-flex justify-content-evenly">
              <div
                className="card border-warning mb-3"
                style={{ maxWidth: "15rem" }}
              >
                <div className="card-header">Bank Offer</div>
                <div className="card-body">
                  <p className="card-text">
                    Upto ₹202.60 discount on select Credit CardsUpto ₹202.60
                    discount on select Credit Cards
                  </p>
                </div>
              </div>
              <div
                className="card border-warning mb-3"
                style={{ maxWidth: "15rem" }}
              >
                <div className="card-header">No Cost EMI</div>
                <div className="card-body">
                  <p className="card-text">
                    Upto ₹91.21 EMI interest savings on Amazon Pay ICICI…
                  </p>
                </div>
              </div>
              <div
                className="card border-warning mb-3"
                style={{ maxWidth: "15rem" }}
              >
                <div className="card-header">Cashback</div>
                <div className="card-body">
                  <p className="card-text">
                    Buy 2 get 3% on Fastrack, Casio & more. Offered by V…
                  </p>
                </div>
              </div>
            </div>
            <Link to="/buyNow">
              <button type="button" className="btn btn-warning buy-text">
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <BestSellingProductList></BestSellingProductList>
      <ProductList></ProductList>
    </>
  );
};

export default ClickProduct;
