import { Navigate, Route, Routes } from "react-router-dom";
import { HomePages } from "../pages/homePages";
import { ContactForm } from "../pages/ContactForm";
import { ListProducts } from "../pages/listProducts";
import { ProductDetail } from "../pages/productDetail";
import { TowersMap } from "../pages/towersMap";
import { About } from "../pages/about";
import { CartPage } from "../pages/cartPage";
import { LoginPage } from "../pages/loginPage";
import { Error404 } from "../pages/error404";
import { AccountPage } from "../pages/accountPage";
import { TestingPage } from "../pages/testingPage";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./protectedRoute";
import { OrdersPage } from "../pages/ordersPage";
import { TowersPage } from "../pages/towersPage";
import {ProductsPage} from "../pages/productsPage"

function RouterHandler({ setSelezionato }) {
  const session = useSelector((state) => state.sessionInfo.sessionExpire);

  return (
    <Routes>
      {/*
      <Route index element={<HomePages setSelezionato={setSelezionato} />} />
      <Route path="/home" element={<Navigate replace to="/" />} />
      <Route path="/contacts" element={<ContactForm />} />
      <Route path="/shop" element={<ListProducts />} />
      <Route path="shop/productDetails/:id" element={<ProductDetail />} />
      <Route path="/maps" element={<TowersMap />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<CartPage />} />
  */}
        <Route path="/login" element={<LoginPage />} />

      <Route path="/*" element={<Error404 />} />
{/*account page riusabile per new/mod utente 
tutte route protette
*/}

      <Route
        path="/orders"//vendite
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
<Route
        path="/towers"
        element={
          <ProtectedRoute>
            <TowersPage />
          </ProtectedRoute>
        }
      />
<Route
        path="/users"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/store"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workers"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route path="/testing" element={<TestingPage />} />

      {/*testingppage */}
    </Routes>
  );
}

export { RouterHandler };
