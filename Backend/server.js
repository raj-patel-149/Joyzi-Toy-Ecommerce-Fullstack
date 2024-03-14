const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "16192003",
  database: "website",
});

app.post("/signup", (req, res) => {
  const {
    name,
    age,
    email,
    password,
    main_add,
    temp_add,
    city,
    state,
    pin_no,
  } = req.body;

  const checkEmailQuery = "SELECT * FROM user WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Email is already taken" });
    }

    const sql =
      "INSERT INTO user (`name`, `age`, `email`, `password` , `main_add` , `temp_add` , `city` , `state` , `pin_no`) VALUES ?";
    const values = [
      [
        req.body.name,
        req.body.age,
        req.body.email,
        req.body.password,
        req.body.main_add,
        req.body.temp_add,
        req.body.city,
        req.body.state,
        req.body.pin_no,
      ],
    ];

    db.query(sql, [values], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res
        .status(200)
        .json({ message: "User registered successfully", success: true });
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const checkEmailQuery = "SELECT * FROM user WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const user = results[0];

    if (password !== user.password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    return res
      .status(200)
      .json({ message: "Login successful", user, success: true });
  });
});

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;

  const getUserQuery = "SELECT * FROM user WHERE id = ?";
  db.query(getUserQuery, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];
    res.status(200).json({ user });
  });
});

app.get("/products", (req, res) => {
  const getProductsQuery = "SELECT * FROM product";
  db.query(getProductsQuery, (err, results) => {
    if (err) {
      console.error("Error fetching product data:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(200).json({ products: results });
  });
});

app.post("/addToCart", (req, res) => {
  const { userId, cartItems } = req.body;

  const getProductInfoQuery = "SELECT id, name FROM product WHERE id IN (?)";

  db.query(getProductInfoQuery, [cartItems], (err, productResults) => {
    if (err) {
      console.error("Error retrieving product information:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    const products = productResults.map((product) => ({
      id: product.id,
      name: product.name,
    }));

    const addToCartQuery =
      "INSERT INTO cart (user_id, product_id, product_name) VALUES ?";
    const values = cartItems.map((itemId) => [
      userId,
      itemId,
      products.find((product) => product.id === itemId).name,
    ]);

    db.query(addToCartQuery, [values], (err, result) => {
      if (err) {
        console.error("Error adding items to cart:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      return res
        .status(200)
        .json({ message: "Items added to cart successfully" });
    });
  });
});

app.listen(8088, () => {
  console.log("Server is listening on port 8088");
});
