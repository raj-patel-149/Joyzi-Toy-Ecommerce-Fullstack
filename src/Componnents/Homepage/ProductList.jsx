import { FcLike } from "react-icons/fc";
import { FaCartShopping } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import DataFetcher from "../../Storage/DataFetcher";
import { useDispatch } from "react-redux";
import { CartAction } from "../../Store/Cart";
import { Link } from "react-router-dom";

const ProductList = () => {
  const jsonData = DataFetcher();

  const dispatch = useDispatch();

  const handleAddToCartBtn = (id, item) => {
    dispatch(CartAction.addItem({ id }));
    alert(`Item was added to cart`);
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
    return shuffledItems.slice(0, 40); // Adjust the number as needed
  };

  const randomProducts = getRandomProducts(jsonData);

  return (
    <div className="product-box">
      {randomProducts.map((item, index) => {
        const stars = item.rating.stars;
        const starCount = Math.floor(stars);

        return (
          <div className="product-card " key={index}>
            <div className="card custom-box-shadow product-top-container">
              <Link to="/productInfo">
                <img
                  src={item.image}
                  className="card-img-top "
                  alt="..."
                  onClick={() => handleImageClick(item.id, item)}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <div className="product-footer card-text">
                  <div className="icon card-text">
                    <div className="like card-text">
                      <FcLike />
                    </div>
                    <div className="cart-produc card-text">
                      <FaCartShopping />
                    </div>
                  </div>
                  <div className="price">₹{item.price}</div>
                </div>
                <div className="product-footer-2">
                  <div className="rating">
                    {[...Array(starCount)].map((_, index) => (
                      <GoStarFill key={index} />
                    ))}
                  </div>
                  <div className="addToCart">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => handleAddToCartBtn(item.id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;

// import { FcLike } from "react-icons/fc";
// import { FaCartShopping } from "react-icons/fa6";
// import { GoStarFill } from "react-icons/go";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useUser } from "../../Store/UserContext"; // Assuming your context is named UserContext

// const ProductList = () => {
//   const { products, setUser, user } = useUser(); // Accessing products from context

//   const dispatch = useDispatch();

//   const handleAddToCartBtn = (id, item) => {
//     dispatch(CartAction.addItem({ id }));
//     alert(`${item.name} was added to cart`);
//   };

//   const handleImageClick = (productId) => {
//     dispatch(CartAction.setClickedProductId({ id: productId }));
//   };

//   return (
//     <div className="product-box">
//       {products.map((item, index) => {
//         // Mapping over products directly
//         const stars = item.stars;
//         const starCount = Math.floor(stars);

//         return (
//           <div className="product-card top-container" key={index}>
//             <div className="card custom-box-shadow">
//               <Link to="/productInfo">
//                 <img
//                   src={item.image}
//                   className="card-img-top "
//                   alt="..."
//                   onClick={() => handleImageClick(item.id, item)}
//                 />
//               </Link>
//               <div className="card-body">
//                 <h5 className="card-title">{item.name}</h5>
//                 <p className="card-text">{item.description}</p>
//                 <div className="product-footer card-text">
//                   <div className="icon card-text">
//                     <div className="like card-text">
//                       <FcLike />
//                     </div>
//                     <div className="cart-produc card-text">
//                       <FaCartShopping />
//                     </div>
//                   </div>
//                   <div className="price">₹{item.price}</div>
//                 </div>
//                 <div className="product-footer-2">
//                   <div className="rating">
//                     {[...Array(starCount)].map((_, index) => (
//                       <GoStarFill key={index} />
//                     ))}
//                   </div>
//                   <div className="addToCart">
//                     <button
//                       type="button"
//                       className="btn btn-warning"
//                       onClick={() => handleAddToCartBtn(item.id)}
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ProductList;
