import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../../Store/UserContext";

const LogIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setUser } = useUser();

  const handleOnChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8088/login", values)
      .then((res) => {
        setUser(res.data.user);
        navigate("/home");
        console.log("User Log in Successfully");
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          console.log("Email not found");
        } else if (err.response && err.response.status === 401) {
          console.log("Incorrect Password");
        }
      });
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5 custom-box-shadow top-container ">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-6 text-center text-lg-start custom-background">
          <div className="image-container">
            <img
              src="login.jpg"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
        </div>
        <div className="col-md-10 mx-auto col-lg-5 custom-background">
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
                onChange={handleOnChange}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                onChange={handleOnChange}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <input
              type="submit"
              value="LOGIN"
              className="w-100 btn btn-lg btn-primary"
              onClick={handleOnClick}
            />

            <hr className="my-4" />
            <small className="text-body-secondary">
              By clicking Sign up, you agree to the terms of use.
            </small>
            <hr className="my-4" />
            <small className="text-body-secondary fs-6 fw-bolder text-center">
              Create new account <Link to="/">Sign Up</Link>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
