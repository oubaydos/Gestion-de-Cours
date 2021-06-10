import React, { useState, useEffect } from "react";
import Header from "./homePage/header/Header";
import Footer from "./homePage/footer/Footer";
import Body from "./homePage/body/Body";
import ContactUs from "./contactUs/ContactUs";
import AboutUs from "./aboutUs/AboutUs";
import AllCourses from "./allCourses/AllCourses";
import AllFormations from "./allCourses/allFormations";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import SignUp from "./signup/SignUp.jsx";
import SignIn from "./signin/SignIn";
import Profil from "./dashboard/profil";
import PageNotFound from "./errors/404";
import MyCourses from "./mycourses/Mycourses";
import { Helmet } from "react-helmet";
import Img from "./dashboard/Img";

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
  // function temp() {
  //   //kifach tjib chi image mn backend
  //   return (
  //     <img
  //       src="http://localhost:5000/addCourse/e0e35040fe509e2cd8689ec45a958539.jfif"
  //       width="824"
  //       height="618"
  //       alt="img"
  //     />
  //   );
  // }
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

  //khasni nchuf wach token expired
  useEffect(() => {
    if (
      localStorage.getItem("currentUser") !== undefined &&
      localStorage.getItem("currentUser") !== null
    )
      setLogedIn(true);
    console.log(logedIn);
  });
  function CondRoute(props) {
    //conditionnal 404
    console.log("props", props.inverse === true);
    if (props.inverse === true) {
      return (
        <Route
          component={!logedIn ? props.component : Profil}
          exact={props.exact}
          path={props.path}
        />
      );
    }
    return (
      <Route
        component={logedIn ? props.component : PageNotFound}
        exact={props.exact}
        path={props.path}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>Gestion de cours</title>
      </Helmet>
      <Router>
        <CondRoute component={Profil} exact={true} path="/dashboard" />
        <CondRoute component={MyCourses} exact={true} path="/mycourses" />
        <Route component={AllCourses} exact path="/courses" />
        <Route component={AllFormations} exact path="/formations" />
        <Route component={ScrollerFunc} exact path="/" />
        <Route component={Head} path="/" />
        <Route component={Body} exact path="/" />
        <Route component={Foot} exact path="/" />
        <Route component={ContactUs} exact path="/contactus" />
        <Route component={AboutUs} exact path="/aboutus" />
        {/* <Route component={SignUp} exact path="/signup" /> */}
        <CondRoute
          component={SignUp}
          exact={true}
          inverse={true}
          path="/signup"
        />
        <CondRoute
          component={SignIn}
          exact={true}
          inverse={true}
          path="/signin"
        />
      </Router>
    </>
  );
}
export default App;
