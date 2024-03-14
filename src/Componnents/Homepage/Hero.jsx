import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="px-4 text-center hero-container custom-box-shadow">
      <img
        className="d-block mx-auto mb-1 image-without-background"
        src="Joyzi Logo.jpg"
        alt=""
        width="200"
        height="200"
      />
      <h1 className="display-5 fw-bold text-body-emphasis">
        Endless Joy Awaits
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Joyzi offers a diverse range of high-quality toys, from educational
          games to imaginative playsets. Our carefully curated collection aims
          to inspire creativity and bring joy to children's playtime .
        </p>
        <div className="d-grid gap-5 d-sm-flex justify-content-sm-center">
          <Link to="/productpage">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 gap-3"
              fdprocessedid="k2ghph"
            >
              Explore Products
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-outline-secondary btn-lg px-4"
            fdprocessedid="a0gasb"
          >
            Join our community
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
