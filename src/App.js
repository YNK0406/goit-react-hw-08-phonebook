import { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppBar from "./components/AppBar/AppBar";
import Container from "./components/Container/Container";
import PrivatRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { authOperations, authSelectors } from "./redux/auth";

const HomeView = lazy(() => import("./views/HomeView/HomeView"));
const RegisterView = lazy(() => import("./views/RegisterView/RegisterView"));
const LoginView = lazy(() => import("./views/LoginView/LoginView"));
const ContactsView = lazy(() => import("./views/ContactsView/ContactsView"));

export default function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);
  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);
  return (
    <Container>
      {isFetchingCurrentUser ? (
        <Loader />
      ) : (
        <>
          <AppBar />
          <ToastContainer position="top-center" />
          <Switch>
            <Suspense fallback={<Loader />}>
              <PublicRoute exact path="/">
                <HomeView />
              </PublicRoute>
              <PublicRoute exact path="/register" restricted>
                <RegisterView />
              </PublicRoute>
              <PublicRoute
                exact
                path="/login"
                redirectTo="/contacts"
                restricted
              >
                <LoginView />
              </PublicRoute>
              <PrivatRoute path="/contacts" redirectTo="/login">
                <ContactsView />
              </PrivatRoute>
            </Suspense>
          </Switch>
        </>
      )}
    </Container>
  );
}
