import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/loginPage";
import { Error404 } from "../pages/error404";
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

      {/*-----ORDERS ROUTES----*/}
      <Route path="/orders">
        <Route
          index={true}
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="new"
          element={
            <ProtectedRoute>
              <OrderNewModPage mod={"new"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="detail/:id"
          element={
            <ProtectedRoute>
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
            <ProtectedRoute>
              <TowersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="new"
          element={
            <ProtectedRoute>
              <TowerNewModPage mod={"new"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="detail/:id"
          element={
            <ProtectedRoute>
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
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="new"
          element={
            <ProtectedRoute>
              <UserNewModPage mod={"new"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="detail/:id"
          element={
            <ProtectedRoute>
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
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="new"
          element={
            <ProtectedRoute>
              <ProductNewModPage mod={"new"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="detail/:id"
          element={
            <ProtectedRoute>
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
            <ProtectedRoute>
              <WorkersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="new"
          element={
            <ProtectedRoute>
              <WorkerNewModPage mod={"new"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="detail/:id"
          element={
            <ProtectedRoute>
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
