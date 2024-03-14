import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./Componnents/Homepage/Footer";
import Header from "./Componnents/Homepage/Header";
import { UserProvider } from "./Store/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Outlet />
        <Footer />
      </UserProvider>
    </>
  );
}

export default App;
