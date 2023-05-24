import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/loginPage";
import { Error404 } from "../pages/error404";
import { Error403 } from "../pages/error403";
import { TestingPage } from "../pages/testingPage";
import { ProtectedRoute } from "./protectedRoute";
import { OrdersPage } from "../pages/ordersPage";
import { TowersPage } from "../pages/towersPage";
import { ProductsPage } from "../pages/productsPage";
import { ProductNewModPage } from "../pages/productNewModPage";
import { UsersPage } from "../pages/usersPage";
import { TowerNewModPage } from "../pages/towerNewModPage";
import { OrderNewModPage } from "../pages/orderNewModPage";
import { UserNewModPage } from "../pages/userNewModPage";
import { WorkersPage } from "../pages/workersPage";
import { WorkerNewModPage } from "../pages/workersNewModPage";

function RouterHandler() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<Error404 />} />
      <Route path="/error403" element={<Error403 />} />

      {/*-----ORDERS ROUTES----*/}
      <Route path="/orders">
        <Route
          index={true}
          element={
            <ProtectedRoute ruoli={["ufficio", "admin", "magazzino"]}>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="new"
          element={
            <ProtectedRoute ruoli={["ufficio", "admin", "magazzino"]}>
              <OrderNewModPage mod={"new"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="detail/:id"
          element={
            <ProtectedRoute ruoli={["ufficio", "admin", "magazzino"]}>
              <OrderNewModPage mod={"detail"} />
            </ProtectedRoute>
          }
        />
      </Route>

      {/*-----TOWERS ROUTES----*/}

      <Route path="/towers">
        <Route
          index={true}
          element={
            <ProtectedRoute ruoli={["ufficio", "admin", "torrista"]}>
              <TowersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="new"
          element={
            <ProtectedRoute ruoli={["ufficio", "admin", "torrista"]}>
              <TowerNewModPage mod={"new"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="detail/:id"
          element={
            <ProtectedRoute ruoli={["ufficio", "admin", "torrista"]}>
              <TowerNewModPage mod={"detail"} />
            </ProtectedRoute>
          }
        />
      </Route>

      {/*-----USERS ROUTES----*/}

      <Route path="/users">
        <Route
          index={true}
          element={
            <ProtectedRoute ruoli={["ufficio", "admin"]}>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="new"
          element={
            <ProtectedRoute ruoli={["ufficio", "admin"]}>
              <UserNewModPage mod={"new"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="detail/:id"
          element={
            <ProtectedRoute ruoli={["ufficio", "admin"]}>
              <UserNewModPage mod={"detail"} />
            </ProtectedRoute>
          }
        />
      </Route>

      {/*-----STORE ROUTES----*/}

      <Route path="/store">
        <Route
          index={true}
          element={
            <ProtectedRoute ruoli={["ufficio", "admin", "magazzino"]}>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="new"
          element={
            <ProtectedRoute ruoli={["ufficio", "admin", "magazzino"]}>
              <ProductNewModPage mod={"new"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="detail/:id"
          element={
            <ProtectedRoute ruoli={["ufficio", "admin", "magazzino"]}>
              <ProductNewModPage mod={"detail"} />
            </ProtectedRoute>
          }
        />
      </Route>

      {/*-----WORKERS ROUTES----*/}

      <Route path="/workers">
        <Route
          index={true}
          element={
            //ufficio?
            <ProtectedRoute ruoli={["ufficio", "admin"]}>
              <WorkersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="new"
          element={
            //solo admin?
            <ProtectedRoute ruoli={["admin"]}>
              <WorkerNewModPage mod={"new"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="detail/:id"
          element={
            //solo admin?
            <ProtectedRoute ruoli={["admin"]}>
              <WorkerNewModPage mod={"detail"} />
            </ProtectedRoute>
          }
        />
      </Route>

      {/*-----TESTING ROUTES----*/}

      <Route path="/testing" element={<TestingPage />} />
    </Routes>
  );
}

export { RouterHandler };
