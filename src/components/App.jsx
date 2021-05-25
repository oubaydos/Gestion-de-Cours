import React, { useState, useEffect } from "react";
import Header from "./homePage/header/Header";
import Footer from "./homePage/footer/Footer";
import Body from "./homePage/body/Body";
import ContactUs from "./contactUs/ContactUs";
import AboutUs from "./aboutUs/AboutUs";
import AllCourses from "./allCourses/AllCourses";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import SignUp from "./signup/SignUp.jsx";
import SignIn from "./signin/SignIn";

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
  const [logedIn, setLogedIn] = useState(false);
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
  function cond() {
    return (
      <div>
        {logedIn ? <p>you are logged in</p> : <p>you are not logged in</p>}
      </div>
    );
  }
  //khasni nchuf wach token expired
  useEffect(() => {
    if (
      localStorage.getItem("currentUser") !== undefined &&
      localStorage.getItem("currentUser") !== null
    )
      setLogedIn(true);
    console.log(logedIn);
  });

  return (
    <Router>
      <Route component={AllCourses} exact path="/courses" />
      <Route component={cond} exact path="/dashboard" />
      <Route component={ScrollerFunc} exact path="/" />
      <Route component={Head} exact path="/" />
      <Route component={Body} exact path="/" />
      <Route component={Foot} exact path="/" />
      <Route component={H1} exact path="/contactus" />
      <Route component={H2} exact path="/aboutus" />
      <Route component={SignUp} exact path="/signup" />
      <Route component={SignIn} exact path="/signin" />
    </Router>
  );
}
export default App;
