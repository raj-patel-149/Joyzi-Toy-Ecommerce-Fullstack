import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../Store/UserContext";

const MakePayment = () => {
  const [progress, setProgress] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setShowMessage(true);
      }, 500);
    }
  }, [progress]);

  return (
    <div className="bg-dark text-secondary px-4 py-5 text-center top-container">
      {progress < 100 ? (
        <div>
          <p>Loading...</p>
          <div
            className="progress"
            role="progressbar"
            aria-label="Info striped example"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="progress-bar progress-bar-striped bg-info"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <div className={`fade-in ${showMessage ? "show" : ""}`}>
          <div className="py-5">
            <h1 className="display-5 fw-bold text-white">
              Your Order was shipped successfully!!
            </h1>
            <div className="col-lg-6 mx-auto">
              <p className="fs-5 mb-4">
                Thank you {user && user.name} for ordering.
              </p>
              <p className="fs-5 mb-4">Order arrived at Monday 7:00 pm.</p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Link to="/home">
                  <button
                    type="button"
                    className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"
                    fdprocessedid="9yh9nk"
                  >
                    Go to home
                  </button>
                </Link>
                <Link to="/productpage">
                  <button
                    type="button"
                    className="btn btn-outline-light btn-lg px-4"
                    fdprocessedid="9t7o4g"
                  >
                    Explore new
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MakePayment;
