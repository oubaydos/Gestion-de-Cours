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
import TestFormation from "./Formation/Test";
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
import Finish from "./mycourses/finish/Enroll";
import FinishFormation from "./mycourses/finish/FinishFormation";
import EnrollFormation from "./enrollCourse/EnrollFormation";
import Onecourse from "./onecourse/Onecourse";

//this could cause a pb
import Prof from "./prof/Prof1";
import Test from "./prof/Addcourse/Course";
import AddPic from "./prof/Addcourse/AddPic";
import AddPicForFormation from "./prof/AddFormation/AddPic";
import ProfCourses from "./prof/Mycourses/Mycourses";
import SurveillerCourses from "./prof/surveiller/Mycourses/Mycourses";
import SurveillerOneCourse from "./prof/surveiller/onecourse/OneCourse";
import ProfFormations from "./prof/Mycourses/MyFormations";
import EditCourse from "./prof/Mycourses/Enroll";
import AddChapters from "./prof/Addcourse/AddChapters";
import AddCourses from "./prof/AddFormation/AddChapters";
import AddFormation from "./prof/AddFormation/Course";
//onecourse
import Start from "./mycourses/start/Start";
import StartFormation from "./mycourses/start/StartFormation";
import AdminLogin from "./admin/SignIn";
import AdminDashboard from "./admin/dashboard/profil";
//certificate - testf
import TestCertificate from "./certificate/Certificate";
//
import NewAdmin from "./admin/newAdmin";
import AdminAllCourses from "./admin/GestionDesCours/AllCourses";
import AdminAllFormations from "./admin/GestionDesCours/allFormations";
import AdminCourseDetails from "./admin/GestionDesCours/description/Enroll";
import AdminFormationDetails from "./admin/GestionDesCours/description/EnrollFormation";
import Students from "./admin/GestionDesEtudiants/Etudiants";
import Profs from "./admin/GestionDesProfs/Prof";
import AdminChangePassword from "./admin/changePassword";
import "../css/styles.css";

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
    if (document.location.pathname.split("/")[1] === "test") {
      return <div></div>;
    }
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
      if (localStorage.getItem("isStudent") === "true")
        return (
          <Route
            component={!logedIn ? props.component : Profil}
            exact={props.exact}
            path={props.path}
          />
        );
      else {
        return (
          <Route
            component={!logedIn ? props.component : Prof}
            exact={props.exact}
            path={props.path}
          />
        );
      }
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
        <Route component={TestCertificate} exact path="/testcertificate" />
        <Route component={AdminAllCourses} exact path="/admin/courses" />
        <Route component={AdminAllFormations} exact path="/admin/formations" />
        {/*this is a test ^|^ */}
        <CondRoute component={Prof} exact={true} path="/prof/dashboard" />

        <Route component={Head} path="/" />
        <Route component={Test} exact path="/prof/addCourse" />
        <Route component={AddPic} exact path="/prof/mycourses/:h/addpic" />

        <Route component={AddFormation} exact path="/prof/addFormation" />
        <Route component={NewAdmin} exact path="/admin/newAdmin" />
        <Route component={AdminCourseDetails} exact path="/admin/courses/:h" />
        <Route component={Students} exact path="/admin/students" />
        <Route component={Profs} exact path="/admin/profs" />
        <Route
          component={AdminFormationDetails}
          exact
          path="/admin/formations/:h"
        />
        <Route
          component={AddChapters}
          exact
          path="/prof/mycourses/:h/addChapters"
        />

        {/* kain chi pb fhad rendering -- jrb / test/chi l3ba katmchi background  */}
        <CondRoute
          component={ProfCourses}
          exact={true}
          path="/prof/mycourses"
        />
        <CondRoute
          component={SurveillerCourses}
          exact={true}
          path="/prof/surveiller"
        />
        <CondRoute
          component={SurveillerOneCourse}
          exact={true}
          path="/prof/surveiller/:h"
        />
        <CondRoute
          component={AddCourses}
          exact={true}
          path="/prof/myformations/:h/addCourses"
        />
        <CondRoute
          component={AddPicForFormation}
          exact={true}
          path="/prof/myformations/:h/addpic"
        />
        <CondRoute
          component={ProfFormations}
          exact={true}
          path="/prof/myformations"
        />
        <CondRoute
          component={AdminChangePassword}
          exact={true}
          path="/admin/changePassword"
        />
        <CondRoute
          component={EditCourse}
          exact={true}
          path="/prof/mycourses/:h"
        />
        <CondRoute
          component={EditCourse}
          exact={true}
          path="/prof/myformations/:h"
        />
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
        <Route component={Finish} path="/myfinishedcourses/:h" />
        <Route component={FinishFormation} path="/myfinishedformations/:h" />
        <Route component={Start} path="/mycourses/:h" />
        <Route component={StartFormation} path="/myformations/:h" />
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
        <Route component={Onecourse} exact path="/mystartedcourses/:h/learn" />
        {/* <Route component={SignUp} exact path="/signup" /> */}
        {/* <Route component={SignUp} exact path="/signup" />  about us lfog*/}
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
        <Route component={AdminLogin} exact path="/admin" />
        <CondRoute
          component={AdminDashboard}
          exact={true}
          path="/admin/dashboard"
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
