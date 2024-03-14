import DataFetcher from "../../Storage/DataFetcher";
import { useUser } from "../../Store/UserContext";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const CartBuy = () => {
  const { user } = useUser();

  const jsonData = DataFetcher();
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

  console.log(numberOfItems);
  console.log(totalPayment);

  return (
    <div class="container top-container">
      <div class="row">
        <div class="col-8">
          {/* Address */}
          <div class="card ">
            <div class="card-header">Delivery address</div>
            <div class="card-body text-center">
              <h5 class="card-title">Your address</h5>
              <p class="card-text">{user && user.main_add}</p>
              <a href="#" class="btn btn-primary">
                Use your second address
              </a>
            </div>
            <div class="card-footer text-body-secondary text-center">
              Order arrived at Monday , 7:00 pm
            </div>
          </div>

          {/* Payment method */}
          <div class="card buy-container">
            <div class="card-header">Payment method</div>
            <div class="card-body">
              <h5 class="card-title">Select payment mrthod</h5>
              <div class="form-check buy-container">
                <input
                  class="form-check-input "
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  <select
                    class="form-select form-select-sm"
                    aria-label="Small select example"
                  >
                    <option selected>By UPI</option>
                    <option value="1">Google Pay</option>
                    <option value="2">PhonePay</option>
                    <option value="3">Paytm</option>
                  </select>
                </label>
              </div>
              <div class="form-check buy-select-container">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  <select
                    class="form-select form-select-sm"
                    aria-label="Small select example"
                  >
                    <option selected>By debit card</option>
                    <option value="1">Visa</option>
                    <option value="2">RuPay</option>
                  </select>
                </label>
              </div>
              <div class="form-check buy-select-container">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Cash on delivery
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Counter */}
        <div class="col-4">
          <div class="card custom-box-shadow" style={{ width: "25rem" }}>
            <img
              src="cartBuy.png"
              class="card-img-top"
              alt="..."
              style={{ width: "25rem", height: "15rem" }}
            />
            <div class="card-body">
              <h5 class="card-title order-text">Order Summary </h5>
              <p class="card-text">
                Please , first choose you payment method then you are aligable
                to buy the product.
              </p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item container">
                <div class="row">
                  <div class="col-8">Number of items selected </div>
                  <div class="col-4 text-center">{numberOfItems}</div>
                </div>
              </li>
              <li class="list-group-item container">
                <div class="row">
                  <div class="col-8">Total price </div>
                  <div class="col-4 text-center">₹{totalPayment}</div>
                </div>
              </li>
              <li class="list-group-item container ">
                <div class="row">
                  <div class="col-8">Delivery charge </div>
                  <div class="col-4 text-center">₹100</div>
                </div>
              </li>
              <li class="list-group-item container buy-select-container ">
                <div class="row">
                  <div class="col-8 total-text">Total payment</div>
                  <div class="col-4 text-center">₹{totalPayment + 100}</div>
                </div>
              </li>
            </ul>
            <Link to="/makePayment">
              <button
                type="button"
                class="btn btn-warning buy-select-container buy-text"
              >
                Make payment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartBuy;
