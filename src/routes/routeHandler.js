import { Navigate, Route, Routes } from "react-router-dom";
import { HomePages } from "../pages/homePages";
import { ListProducts } from "../pages/listProducts";
import { ProductDetail } from "../pages/productDetail";
import { CartPage } from "../pages/cartPage";
import { LoginPage } from "../pages/loginPage";
import { Error404 } from "../pages/error404";
import { AccountPage } from "../pages/accountPage";
import { TestingPage } from "../pages/testingPage";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./protectedRoute";
import { OrdersPage } from "../pages/ordersPage";
import { TowersPage } from "../pages/towersPage";
import { ProductsPage } from "../pages/productsPage"
import { ProductNewModPage } from "../pages/productNewModPage";
import { UsersPage } from "../pages/usersPage";
import { TowerNewModPage } from "../pages/towerNewModPage"
import { OrderNewModPage } from "../pages/orderNewModPage";

function RouterHandler({ setSelezionato }) {
  const session = useSelector((state) => state.sessionInfo.sessionExpire);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<Error404 />} />


      <Route path='/orders'>
      
      <Route index={true} element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
      <Route path='new' element={<ProtectedRoute><OrderNewModPage mod={"new"} /></ProtectedRoute >}/>
      <Route path='detail/:id' element={<ProtectedRoute><OrderNewModPage mod={"detail"} /></ProtectedRoute >} />
    </Route>

      
      <Route path='/towers'>
      
        <Route index={true} element={<ProtectedRoute><TowersPage /></ProtectedRoute>} />
        <Route path='new' element={<ProtectedRoute><TowerNewModPage mod={"new"} /></ProtectedRoute >}/>
        <Route path='detail/:id' element={<ProtectedRoute><TowerNewModPage mod={"detail"} /></ProtectedRoute >} />
      </Route>

      
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />

    <Route path='/store'>
      
      <Route index={true} element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
      <Route path='new' element={<ProtectedRoute><ProductNewModPage mod={"new"} /></ProtectedRoute >}/>
      <Route path='detail/:id' element={<ProtectedRoute><ProductNewModPage mod={"detail"} /></ProtectedRoute >} />
    </Route>

      <Route
        path="/workers"
        element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route path="/testing" element={<TestingPage />} />

      {/*testingppage */}
      </Routes>
  );
}

export { RouterHandler };
