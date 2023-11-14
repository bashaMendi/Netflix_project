import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../components/pages/HomePage";
import Menus from "../components/Navigation/Menu";
import MyList from "../components/pages/MyList";
import Register from "../components/pages/Register";
import Login from "../components/pages/Login";
import UserList from "../components/auth/admin/UserList";
import { MDX_PROFILEID, TOKEN_KEY } from "../constant/url";
import Page404 from "../components/pages/Page404";
import SaerchMovie from "../components/pages/SaerchMovie";
import ProfileManage from "../components/auth/user/profile/ProfileManage";
import useScreen from "../hooks/useScreen";
import useAuth from "../hooks/useAuth";
import Watch from "../components/pages/Watch";
import ShopPromo from "../foods/components/pages/ShopPromo";
import ShopCategories from "../foods/components/pages/ShopCategories";
import ShopProductPage from "../foods/components/pages/ShopProductPage";
import ShopProductsList from "../foods/components/pages/ShopProductsList";
import AddProduct from "../foods/admin/products/AddProduct";
import Navigation from "../foods/components/components/menu/Navigation";
import LoginAdmin from "../foods/admin/LoginAdmin";
import MenuAdmin from "../foods/admin/MenuAdmin";
import ProductList from "../foods/admin/products/ProductList";
import EditProduct from "../foods/admin/products/EditProduct";
import AuthAdmin from "../components/auth/admin/AuthAdmin";
import CategoriesList from "../foods/admin/categoris/CategoriesList";
import AddCategories from "../foods/admin/categoris/AddCategories";
import EditCategories from "../foods/admin/categoris/EditCategories";
import ProductSearch from "../foods/components/pages/ProductSearch";
import AddAddress from "../foods/components/pages/AddAddress";
import EditAddress from "../foods/components/pages/EditAddress";
import AddressList from "../foods/components/pages/AddressList";
import Checkout from "../foods/components/cart/payment/Checkout";
import Footer from "../components/components/footer/Footer";
import TvPage from "../components/pages/TvPage";
import AuthUser from "../components/auth/user/AuthUser";
import MoviesPage from "../components/pages/MoviesPage";
import AuthManager from "../components/auth/manager/AuthManager";
import LoginManager from "../components/auth/manager/LoginManager";
import MenuManager from "../components/auth/manager/MenuManager";
import VerifiEmall from "../components/auth/user/verifiEmall";

const AppRoutes = () => {
  const { user, error, loading, getUser, status } = useAuth();

  const { booRender, resetBoolRenderHandler } = useScreen();

  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    // getUser()
    console.log(user);
    if (localStorage[MDX_PROFILEID] && localStorage[TOKEN_KEY] && booRender) {
      window.location.reload();
      resetBoolRenderHandler();
      // console.log("IN IF");
    }
  }, [localStorage[MDX_PROFILEID]]);

  return (
    <Router>
      <Routes>
        <Route path="*" element={showMenu && <Menus />} />
        <Route path="/shop/*" element={<Navigation />} />
        <Route path="/manager/*" element={<MenuManager user={user} />} />
        <Route path="/admin/*" element={<MenuAdmin user={user} />} />
      </Routes>

      {/* user --> (login end register) */}
      <Routes>
        {!user && !localStorage[TOKEN_KEY] && (
          <Route index element={<Login />} />
        )}
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:token/" element={<VerifiEmall/>} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {/* show side movies */}
      {user && localStorage[TOKEN_KEY] && localStorage[MDX_PROFILEID] && (
        <Routes>
          <Route path="/" element={<AuthUser />} />
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/tv" element={<TvPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/my-list" element={<MyList />} />
          <Route
            path="/watch/:id"
            element={<Watch setShowMenu={setShowMenu} />}
          />
          <Route
            path="/profile/manage"
            element={<ProfileManage show={false} setShowMenu={setShowMenu} />}
          />
          <Route path="search/:query" element={<SaerchMovie />} />
        </Routes>
      )}

      {/* select watch screen (if c'not select ? not watch : watch) */}
      <Routes>
        {localStorage[TOKEN_KEY] && !localStorage[MDX_PROFILEID] && (
          <Route path="*" element={<ProfileManage show={true} />} />
        )}
      </Routes>

      {/* show side shop */}
      <Routes>
        <Route path="/shop/promo" element={<ShopPromo />} />
        <Route path="/shop/categories" element={<ShopCategories />} />
        <Route
          path="/shop/products/search/:query"
          element={<ProductSearch />}
        />
        <Route path="/shop/products/:cat" element={<ShopProductsList />} />
        <Route path="/shop/product/:id" element={<ShopProductPage />} />
        <Route path="/shop/checkaut" element={<Checkout />} />
        <Route
          path="/shop/address/:userId/:screenId"
          element={<AddressList />}
        />
        <Route path="/shop/addAddress" element={<AddAddress />} />
        <Route
          path="/shop/editAddress/:userId/:addressId"
          element={<EditAddress />}
        />
      </Routes>

      {/* manager shop */}
      <Routes>
        {/* login */}
        <Route path="/manager/:all/*" element={<AuthManager />} />
        <Route path="/manager/login" element={<LoginManager />} />
        {user?.role === "manager" && (
          <>
            {/* shop */}
            <Route path="/manager/products" element={<ProductList />} />
            <Route path="/manager/addProduct" element={<AddProduct />} />
            <Route path="/manager/editProduct/:id" element={<EditProduct />} />

            <Route path="/manager/categories" element={<CategoriesList />} />
            <Route path="/manager/addCategory" element={<AddCategories />} />
            <Route
              path="/manager/editCategory/:id"
              element={<EditCategories />}
            />
          </>
        )}
      </Routes>

      {/* admin movies end shop */}
      <Routes>
        {/* login */}
        <Route path="/admin/:all/*" element={<AuthAdmin />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        {user?.role === "admin" && (
          <>
            {/* movies */}
            <Route path="/admin/users" element={<UserList />} />

            {/* shop */}
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/addProduct" element={<AddProduct />} />
            <Route path="/admin/editProduct/:id" element={<EditProduct />} />

            <Route path="/admin/categories" element={<CategoriesList />} />
            <Route path="/admin/addCategory" element={<AddCategories />} />
            <Route
              path="/admin/editCategory/:id"
              element={<EditCategories />}
            />
          </>
        )}

        {/* Page 404 */}
        {/* <Route path="/*" element={<Page404 />} /> */}
      </Routes>
      {!loading && <Footer />}
    </Router>
  );
};

export default AppRoutes;
