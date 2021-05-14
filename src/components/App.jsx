import React from "react";

import Header from "./homePage/header/Header";
import Footer from "./homePage/footer/Footer";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function H1() {
  return <h1>Contact us page</h1>;
}
function H2() {
  return <h1>About us page</h1>;
}
function Head() {
  return (
    <header>
      <Header />
    </header>
  );
}
function Foot() {
  return (
    <footer>
      <Footer />
    </footer>
  );
}
function App() {
  return (
    <Router>
      <Route component={Head} exact path="/" />
      <Route component={Foot} path="/" />
      <Route component={H1} exact path="/contactus" />
      <Route component={H2} exact path="/aboutus" />
    </Router>
  );
}
export default App;
