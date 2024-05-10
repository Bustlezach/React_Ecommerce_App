import React from "react";
import Home from "./pages/Home";
import Productlist from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
// import ComponentOne from "./app_context/ComponentOne";
import {
   BrowserRouter as Router,
   Routes, 
   Route,
   Navigate,
} from "react-router-dom"


function App() {
  const user = true;
  return (
    <Router>
      <Routes>
        <Route
         index 
         Component={Home}
        >
        </Route>
        <Route
         path="/product/:id" 
         Component={Product}
        >
        </Route>
        <Route
         path="/products/:category" 
         Component={Productlist}
        >
        </Route>
        <Route
         path="/register" 
        //  Component={Register}
        element={user ? <Navigate to="/" replace /> : <Register />}
        >
        </Route>
        <Route
         path="/login" 
        element={user ? <Navigate to="/" replace/>: <Login />}
        >
        </Route>
        <Route
         path="/cart" 
         Component={Cart}
        >
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
