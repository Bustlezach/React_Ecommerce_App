import React from "react";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ComponentOne from "./app_context/ComponentOne";


function App() {
  return (
    <div className="App">
      {/* <ComponentOne oruko="Nigerian movie" oda="Blue" /> */}
      <Cart />
    </div>
  );
}

export default App;
