import { useSelector } from "react-redux";
import DataFetcher from "../../Storage/DataFetcher";
import ProductList from "../Homepage/ProductList";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CartAction } from "../../Store/Cart";
import { Link } from "react-router-dom";

const CartPage = () => {
  const jsonData = DataFetcher();

  const dispatch = useDispatch();

  const handleAddToCartBtn = (id, item) => {
    dispatch(CartAction.addItem({ id }));
    alert(`Item was added to cart`);
  };
  const handleDeleteBtn = (id) => {
    dispatch(CartAction.deleteItem({ id }));
    alert("Item was deleted");
  };

  const handleImageClick = (productId) => {
    dispatch(CartAction.setClickedProductId({ id: productId }));
  };

  const getRandomProducts = (jsonData) => {
    if (!jsonData || !jsonData.items || !Array.isArray(jsonData.items[0])) {
      return [];
    }
    const items = jsonData.items[0];
    const shuffledItems = items.sort(() => Math.random() - 0.5);
    return shuffledItems.slice(0, 3);
  };

  const limitedItems = getRandomProducts(jsonData);

  const { cartItems } = useSelector((store) => store.Cart);

  const cartItemsData =
    jsonData && jsonData.items[0].filter((item) => cartItems.includes(item.id));

  const [numberOfItems, setNumberOfItems] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    if (cartItems && cartItems.length > 0 && jsonData && jsonData.items) {
      setNumberOfItems(cartItems.length);

      const total = cartItems.reduce((acc, itemId) => {
        const item = jsonData.items.flat().find((item) => item.id === itemId);

        if (item && !isNaN(item.price)) {
          return acc + item.price;
        }

        return acc;
      }, 0);

      setTotalPayment(total);
    } else {
      setNumberOfItems(0);
      setTotalPayment(0);
    }
  }, [cartItems, jsonData]);

  return (
    <>
      <div className="container-cart">
        <h1 className="display-6  text-black cart-title">Shopping Cart</h1>
        <div className="row mb-3 text-center container-cart">
          <div className="col-md-8 themed-grid-col">
            <div className="bd-example m-0 border-0">
              <ul className="list-group list-group-flush">
                {cartItemsData &&
                  cartItemsData.map((item, index) => {
                    return (
                      <li
                        className="list-group-item custom-box-shadow"
                        key={index}
                      >
                        <div className="card mb-3" style={{ maxWidth: "100%" }}>
                          <div className="cart-container">
                            <div className="chechbox">
                              <input type="checkbox"></input>
                            </div>
                            <div className="cart-image">
                              <Link to="/productInfo">
                                <img
                                  src={item.image}
                                  className="img-fluid rounded-start"
                                  alt="..."
                                  style={{ width: "18rem" }}
                                  onClick={() =>
                                    handleImageClick(item.id, item)
                                  }
                                />
                              </Link>
                            </div>

                            <div className="cart-info">
                              <div className="cart-body">
                                <h5 className="cart-title">{item.name}</h5>
                                <p className="cart-text">{item.description}</p>
                                <div className="commonInfo">
                                  <p className="text-body-secondary">
                                    In stock
                                  </p>
                                  <p className="text-body-secondary">
                                    Eligible for FREE Shipping
                                  </p>
                                  <p className="text-body-secondary">
                                    <input
                                      type="checkbox"
                                      id="myCheckbox"
                                      name="myCheckbox"
                                      value="checkBoxValue"
                                    />
                                    <label htmlFor="myCheckbox">
                                      This will be a giftThis is a gift{" "}
                                      <span>
                                        <a href="" className="cart-link">
                                          Learn more
                                        </a>
                                      </span>
                                    </label>
                                  </p>

                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteBtn(item.id)}
                                  >
                                    Remove from cart
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="price-section">
                              <p className="cart-price">₹{item.price}</p>
                              <a href="#" className="cart-link">
                                Save 5 % more with Subscribe & Save
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>

          {/* Counter */}
          <div className="col-6 col-md-4 themed-grid-col custom-box-shadow">
            <div className="card text-center">
              <div className="card-header">Total Payment</div>
              <div className="card-body">
                <h5 className="card-title">
                  Number of Items : {numberOfItems}
                </h5>
                <p className="card-text">Total : ₹{totalPayment}</p>
                <button type="button" className="btn btn-warning">
                  <Link to="/cartBuy" className="buy-text ">
                    Proceed to Buy
                  </Link>
                </button>
              </div>
              <div className="card-footer text-body-secondary">
                Add more to get 40% off
              </div>
            </div>

            {/* Image */}
            {limitedItems &&
              limitedItems.map((item, index) => {
                return (
                  <div
                    className="card mb-3 cart-right-item"
                    style={{ maxWidth: "540px" }}
                    key={index}
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <Link to="/productInfo">
                          <img
                            src={item.image}
                            className="img-fluid rounded-start"
                            alt="..."
                            onClick={() => handleImageClick(item.id, item)}
                          />
                        </Link>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text">{item.description}</p>
                          <p className="card-text">
                            <small className="text-body-bold">
                              ₹{item.price}
                            </small>
                          </p>
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => handleAddToCartBtn(item.id, item)}
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <ProductList></ProductList>
    </>
  );
};

export default CartPage;
