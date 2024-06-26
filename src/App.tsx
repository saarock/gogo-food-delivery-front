import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import {
  AboutPage,
  AddToCartPage,
  BreakFast,
  Contact,
  CookedFood,
  DashPage,
  FetchByBookingReceived,
  LoginPage,
  ReviewPage,
} from "./pages";
import Home from "./pages/home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { appWriteService } from "./service";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/authSlice";
import TermsConditions from "./pages/termsConditions/TermsConditions";
import ClothingPage from "./pages/clothingPage/ClothingPage";
import { RootState } from "./types/rootState";

const App = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    appWriteService.getCurrentUser().then((userData) => {
      if (!userData) return;
      console.log("this");
      console.log(userData);
      // return;
      dispatch(login(userData));
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProtectedRoute children={<Home />} />} />
          <Route
            path="/dash"
            element={<ProtectedRoute children={<DashPage />} />}
          ></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route
            path="/cart"
            element={
              <AddToCartPage
                deleteFromCart={function (id: number): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          ></Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/cooked" element={<CookedFood />} />
          <Route path="/breakfast" element={<BreakFast />} />
          <Route path="/dairy" element={<BreakFast />} />
          <Route
            path="/login"
            element={<ProtectedRoute children={<LoginPage />} />}
          />

          <Route
            path="/gogo-terms-and-conditions"
            element={<TermsConditions />}
          />
          <Route path={`/clothings/jeans`} element={<ClothingPage />} />
          <Route path={`/clothings/jackets`} element={<ClothingPage />} />
          <Route
            path="/clothings/vests"
            element={<ProtectedRoute children={<ClothingPage />} />}
          ></Route>
                    <Route
            path="/booking/:receivedId"
            element={<ProtectedRoute children={<FetchByBookingReceived />} />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
