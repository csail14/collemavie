import "./App.css";
import { Switch, Route } from "react-router-dom";

import Home from "./containers/home";
import Header from "./containers/header";
import Footer from "./containers/footer";
import Presentation from "./containers/presentation";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/presentation" component={Presentation} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
