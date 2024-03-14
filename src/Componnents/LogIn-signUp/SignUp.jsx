import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../Store/UserContext";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    main_add: "",
    temp_add: "",
    city: "",
    state: "",
    pin_no: "",
  });

  const navigate = useNavigate();

  const { setUser } = useUser();

  const handleOnChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8088/signup", values)
      .then((res) => {
        navigate("/login");
        console.log("Registred Successfully");
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          console.log("Email is already taken");
          // You can display a message to the user here
        } else {
          console.log("An error occurred:", err.message);
          // Handle other errors if needed
        }
      });
  };

  return (
    <div
      className="card mb-3 sign-container custom-box-shadow"
      style={{ minWidth: "540px" }}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <div className="image-container">
            <img
              src="signup.jpg"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
        </div>
        <div className="col-md-8 custom-background">
          <div className="card-body">
            <form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Enter your name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  name="name"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Enter your age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputAge"
                  name="age"
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  name="email"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  name="password"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  name="main_add"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">
                  Address 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                  name="temp_add"
                  onChange={handleOnChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  name="city"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">
                  State
                </label>
                <input
                  id="inputState"
                  className="form-control"
                  name="state"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="inputZip" className="form-label">
                  Pincode No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                  name="pin_no"
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary sign-text"
                onClick={handleOnClick}
              >
                {/* <Link to="/login" className="sign-text"> */}
                Create Account
                {/* </Link> */}
              </button>

              <hr className="my-4" />
              <small className="text-body-secondary fs-6 fw-bolder text-center">
                You have an account ? <Link to="/login">Log In</Link>
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
