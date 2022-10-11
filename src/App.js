import "./App.css";
import { useEffect } from "react";
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
  useEffect(() => {
    console.log("hello");
    fetch("/api")
      .then((res) => res.json())
      .then((data) => console.log(data.message));
  }, []);
  console.log("hello");
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
          fontSize: "15px",
          fontWeight: "700",
          fontFamily: "sans-serif",
        }}
      >
        Suivez moi sur Instagram :{" "}
        <a
          href="https://www.instagram.com/collemavie/"
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: "underline",
            fontSize: "15px",
            marginRight: 0,
          }}
        >
          @collemavie
        </a>
      </div>
    </div>
  );
}

export default App;
