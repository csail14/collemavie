import "./App.css";
import { Switch, Route } from "react-router-dom";

import Home from "./containers/home";
import Header from "./containers/header";
import Footer from "./containers/footer";
import Presentation from "./containers/presentation";
import Products from "./containers/products";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/presentation" component={Presentation} />
        <Route exact path="/products" component={Products} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
