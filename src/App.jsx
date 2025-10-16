import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ui/ProtectedRoute";
import ProtectedRouteLogin from "./ui/ProtectedRouteLogin";
import Spinner from "./ui/Spinner";

const Home = lazy(() => import("./pages/Home"));
const PageNotFound = lazy(() => import("./ui/PageNotFound"));
const AppLayOut = lazy(() => import("./pages/AppLayOut"));
const About = lazy(() => import("./pages/About"));
const Books = lazy(() => import("./pages/Books"));
const User = lazy(() => import("./pages/User"));
const Order = lazy(() => import("./pages/Order"));
const LogIn = lazy(() => import("./pages/LogIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const Book = lazy(() => import("./features/booksList/book"));
const ResetPassword = lazy(() => import("./features/Auth/ResetPassword"));
const OrderBillDetails = lazy(
  () => import("./features/order/OrderBillDetails"),
);
const OrderedList = lazy(() => import("./features/order/OrderedList"));
const OrderBillReceipt = lazy(
  () => import("./features/order/OrderBillReceipt"),
);

// import Home from "./pages/Home";
// import PageNotFound from "./ui/PageNotFound";
// import AppLayOut from "./pages/AppLayOut";
// import About from "./pages/About";
// import Books from "./pages/Books";
// import User from "./pages/User";
// import Order from "./pages/Order";
// import LogIn from "./pages/LogIn";
// import SignUp from "./pages/SignUp";
// import UpdatePassword from "./pages/UpdatePassword";
// import Book from "./features/booksList/book";
// import ResetPassword from "./features/Auth/ResetPassword";
// import OrderBillDetails from "./features/order/OrderBillDetails";
// import OrderedList from "./features/order/OrderedList";
// import OrderBillReceipt from "./features/order/OrderBillReceipt";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              path="updatePassword"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />

            <Route element={<AppLayOut onclick={() => console.log("hi")} />}>
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<Home />} />

              <Route path="about" element={<About />} />
              <Route
                path="books"
                element={
                  <ProtectedRoute>
                    <Books />
                  </ProtectedRoute>
                }
              />

              <Route path="books/:id" element={<Book />} />
              {/* <Route path="cart" element={<Cart />} /> */}
              <Route
                path="order"
                element={
                  <ProtectedRoute>
                    <Order />
                  </ProtectedRoute>
                }
              />

              <Route
                path="user"
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                }
              />

              <Route
                path="orderConfirmationBill"
                element={
                  <ProtectedRoute>
                    <OrderBillDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path="orderedList"
                element={
                  <ProtectedRoute>
                    <OrderedList />
                  </ProtectedRoute>
                }
              />

              <Route
                path="orderedList/:id"
                element={
                  <ProtectedRoute>
                    <OrderBillReceipt />
                  </ProtectedRoute>
                }
              />

              <Route
                path="login"
                element={
                  <ProtectedRouteLogin>
                    <LogIn />
                  </ProtectedRouteLogin>
                }
              />
              <Route
                path="resetPassword"
                element={
                  <ProtectedRouteLogin>
                    <ResetPassword />
                  </ProtectedRouteLogin>
                }
              />

              <Route
                path="signUp"
                element={
                  <ProtectedRouteLogin>
                    <SignUp />
                  </ProtectedRouteLogin>
                }
              />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 6000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#ffff",
            color: "#111111",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
