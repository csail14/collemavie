import "./App.css";
import { Switch, Route } from "react-router-dom";
import ScrollToTop from "./helpers/ScrollTopTop";
import Home from "./containers/home";
import Header from "./containers/header";
import Footer from "./containers/footer";
import Presentation from "./containers/presentation";
import Products from "./containers/productsDisplay";
import RequireAuth from "./helpers/require-auth";
import Admin from "./containers/admin";
import Login from "./containers/login";
import MainProduct from "./components/mainProduct";

function App() {
  return (
    <div className="App">
      <Header />
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={RequireAuth(Home)} />
        <Route exact path="/home" component={RequireAuth(Home)} />
        <Route
          exact
          path="/presentation"
          component={RequireAuth(Presentation)}
        />
        <Route exact path="/products" component={RequireAuth(Products)} />
        <Route exact path="/product/:id" component={RequireAuth(MainProduct)} />
        <Route exact path="/login" component={Login} />

        <Route exact path="/admin" component={RequireAuth(Admin, true)} />
      </Switch>
      <Footer />

      <div
        class="insta"
        style={{
          color: "#0095f6",
          fontSize: "22px",
          fontWeight: "700",
          fontFamily: "sans-serif",
        }}
      >
        View more on Instagram
      </div>
    </div>
  );
}

export default App;
