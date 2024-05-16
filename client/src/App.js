import React from "react";
import Home from "./pages/Home";
import Productlist from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { Navigate } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/product/:id",
      element: <Product />,
    },
    {
      path: "/products/:category",
      element: <Productlist />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" replace /> : <Register />,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" replace /> : <Login />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/success",
      element: <Success />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

// <Routes>
//   <Route index Component={Home}></Route>
//   <Route path="/product/:id" Component={Product}></Route>
//   <Route path="/products/:category" Component={Productlist}></Route>
//   <Route
//     path="/register"
//     element={user ? <Navigate to="/" replace /> : <Register />}
//   ></Route>
//   <Route
//     path="/login"
//     element={user ? <Navigate to="/" replace /> : <Login />}
//   ></Route>
//   <Route path="/cart" Component={Cart}></Route>
// </Routes>
