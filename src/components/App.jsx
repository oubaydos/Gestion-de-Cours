import React, { useState } from "react";

import Header from "./homePage/header/Header";
import Footer from "./homePage/footer/Footer";
import Body from "./homePage/body/Body";
import ContactUs from "./contactUs/ContactUs";
import AboutUs from "./aboutUs/AboutUs";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import SignUp from "./signup/SignUp";

function H1() {
  return (
    <div>
      <ContactUs />
    </div>
  );
}
function H2() {
  return (
    <div>
      <AboutUs />
    </div>
  );
}

function App() {
  const [bottom, setBottom] = useState(false);
  function handleBottom() {
    console.log("bottom", bottom);
    if (bottom === false) {
      setBottom(true);
    }
  }
  function ScrollerFunc() {
    return (
      <BottomScrollListener onBottom={handleBottom} triggerOnNoScroll={true} />
    );
  }
  function Head() {
    return (
      <header>
        <Header />
      </header>
    );
  }
  function Foot() {
    return <footer>{bottom === true && <Footer />}</footer>;
  }
  // i am trying to detect the bottom of the page to show footer
  return (
    <Router>
      <Route component={ScrollerFunc} exact path="/" />
      <Route component={Head} exact path="/" />
      <Route component={Body} exact path="/" />
      <Route component={Foot} exact path="/" />
      <Route component={H1} exact path="/contactus" />
      <Route component={H2} exact path="/aboutus" />
      <Route component={SignUp} exact path="/signup" />
    </Router>
  );
}
export default App;
