import DataFetcher from "../../Storage/DataFetcher";
import { useDispatch } from "react-redux";
import { CartAction } from "../../Store/Cart";
import { Link } from "react-router-dom";

const BestSellingProductList = () => {
  const jsonData = DataFetcher();
  const dispatch = useDispatch();

  const handleImageClick = (productId) => {
    dispatch(CartAction.setClickedProductId({ id: productId }));
  };

  const getRandomProducts = (jsonData) => {
    if (!jsonData || !jsonData.items || !Array.isArray(jsonData.items[0])) {
      return [];
    }
    const items = jsonData.items[0];
    const shuffledItems = items.sort(() => Math.random() - 0.5);
    return shuffledItems.slice(0, 3); // Adjust the number as needed
  };

  const limitedItems = getRandomProducts(jsonData);

  return (
    <div className="container px-4 py-5" id="custom-cards">
      <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        {limitedItems &&
          limitedItems.map((item, index) => {
            return (
              <div className="col " key={index}>
                <Link to="/productInfo">
                  <div
                    className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg bg-cover bg-no-repeat bg-cover-no-repeat custom-box-shadow custom-text-best"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      objectFit: "cover",
                      height: "100%",
                    }}
                    onClick={() => handleImageClick(item.id, item)}
                  >
                    <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                      <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold "></h3>
                      <ul className="d-flex list-unstyled mt-auto">
                        <li className="me-auto">
                          <img
                            src="Joyzi Logo nbg.png"
                            alt="Bootstrap"
                            width="32"
                            height="32"
                            className="rounded-circle border border-white"
                          />
                        </li>
                        <li className="d-flex align-items-center me-3">
                          <svg className="bi me-2" width="1em" height="1em">
                            <use xlinkHref="#geo-fill"></use>
                          </svg>
                          <small>{item.price}</small>
                        </li>
                        <li className="d-flex align-items-center">
                          <svg className="bi me-2" width="1em" height="1em">
                            <use xlinkHref="#calendar3"></use>
                          </svg>
                          <small>3d</small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BestSellingProductList;
