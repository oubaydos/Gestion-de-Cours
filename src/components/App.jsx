import React, { useState, useEffect } from "react";
import Header from "./homePage/header/Header";
import Footer from "./homePage/footer/Footer";
import Body from "./homePage/body/Body";
import ContactUs from "./contactUs/ContactUs";
import AboutUs from "./aboutUs/AboutUs";
import AllCourses from "./allCourses/AllCourses";
import AllFormations from "./allCourses/allFormations";
import Search from "./search/Search";
import SearchFormation from "./search/SearchFormation";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import SignUp from "./signup/SignUp.jsx";
import SignIn from "./signin/SignIn";
import Profil from "./dashboard/profil";
import PageNotFound from "./errors/404";
import MyCourses from "./mycourses/Mycourses";
import MyStartedCourses from "./mycourses/MyStartedCourses";
import MyStartedFormations from "./mycourses/MyStartedFormations";
import MyFinishedCourses from "./mycourses/MyFinishedCourses";
import MyFinishedFormations from "./mycourses/MyFinishedFormations";

import MyFormations from "./mycourses/MyFormations";
import { Helmet } from "react-helmet";
import Enroll from "./enrollCourse/Enroll";
import EnrollFormation from "./enrollCourse/EnrollFormation";
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
        <Route component={Head} path="/" />

        <CondRoute component={Profil} exact={true} path="/dashboard" />
        <CondRoute component={MyCourses} exact={true} path="/mycourses" />
        <CondRoute
          component={MyStartedCourses}
          exact={true}
          path="/mystartedcourses"
        />
        <CondRoute
          component={MyFinishedCourses}
          exact={true}
          path="/myfinishedcourses"
        />
        <CondRoute
          component={MyStartedFormations}
          exact={true}
          path="/mystartedformations"
        />
        <CondRoute
          component={MyFinishedFormations}
          exact={true}
          path="/myfinishedformations"
        />
        <CondRoute component={MyFormations} exact={true} path="/myformations" />
        <Route component={Enroll} path="/courses/:h" />
        <Route component={EnrollFormation} path="/formations/:h" />
        <Route component={AllCourses} exact path="/courses" />

        <Route component={Search} path="/search" />
        <Route component={SearchFormation} path="/searchFormation" />

        <Route component={AllFormations} exact path="/formations" />
        <Route component={ScrollerFunc} exact path="/" />

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
/**
 *
 * daba khasna ndiro details page dyal formation + enroll function
 * --------------
 * après aykhsna nkhdmo 3la single course
 * ----------
 * le 13/06/2021 ankon salit l etudiant inchalah
 */
