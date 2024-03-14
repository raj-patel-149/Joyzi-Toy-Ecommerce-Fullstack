import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch user data from the server upon component mount
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8088/user/1"); // Assuming user ID is 1
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch all products data from the server upon component mount
    const fetchProductsData = async () => {
      try {
        const response = await axios.get("http://localhost:8088/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products data:", error);
      }
    };

    fetchUserData();
    fetchProductsData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, products }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
