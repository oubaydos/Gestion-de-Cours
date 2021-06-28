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
import Finish from "./mycourses/finish/Enroll";
import FinishFormation from "./mycourses/finish/FinishFormation";
import EnrollFormation from "./enrollCourse/EnrollFormation";
import Onecourse from "./onecourse/Onecourse";

//this could cause a pb
import Prof from "./prof/Prof1";
import ProfAddCourse from "./prof/Addcourse/Cours";
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
import Certificate from "./certificate/Certificate";
//
import NewAdmin from "./admin/newAdmin";
import AdminAllCourses from "./admin/GestionDesCours/AllCourses";
import AdminAllFormations from "./admin/GestionDesCours/allFormations";
import AdminCourseDetails from "./admin/GestionDesCours/description/Enroll";
import AdminFormationDetails from "./admin/GestionDesCours/description/EnrollFormation";
import Students from "./admin/GestionDesEtudiants/Etudiants";
import Profs from "./admin/GestionDesProfs/Prof";
import AdminChangePassword from "./admin/changePassword";
import ProfChangePassword from "./prof/changePassword";
import ChangePassword from "./changePassword/changePassword";
import OneFormation from "./Formation/formation";
import Quiz from "./onecourse/Quiz";

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
    if (
      document.location.pathname.split("/")[3] === "certificate" ||
      document.location.pathname.split("/")[1] === "testcertificate"
    ) {
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
  function AdminRoute(props) {
    let temp = localStorage.getItem("isAdmin");
    if (props.inverse) {
      temp === "true" ? (temp = null) : (temp = "true");
    }
    if (temp === "true") {
      return (
        <Route
          component={props.component}
          exact={props.exact}
          path={props.path}
        />
      );
    }
    return (
      <Route component={PageNotFound} exact={props.exact} path={props.path} />
    );
  }
  function ProfRoute(props) {
    if (localStorage.getItem("isStudent") === "false") {
      return (
        <Route
          component={props.component}
          exact={props.exact}
          path={props.path}
        />
      );
    }
    return (
      <Route component={PageNotFound} exact={props.exact} path={props.path} />
    );
  }
  function StudentRoute(props) {
    if (localStorage.getItem("isStudent") === "true") {
      return (
        <Route
          component={props.component}
          exact={props.exact}
          path={props.path}
        />
      );
    }
    return (
      <Route component={PageNotFound} exact={props.exact} path={props.path} />
    );
  }
  function CondRoute(props) {
    //conditionnal 404
    if (props.inverse === true) {
      if (localStorage.getItem("isStudent") === "true")
        return (
          <Route
            component={!logedIn ? props.component : Profil}
            exact={props.exact}
            path={props.path}
          />
        );
      else if (
        localStorage.getItem("isAdmin") === null ||
        localStorage.getItem("isAdmin") === undefined
      ) {
        return (
          <Route
            component={!logedIn ? props.component : Prof}
            exact={props.exact}
            path={props.path}
          />
        );
      } else {
        return (
          <Route
            component={!logedIn ? props.component : AdminDashboard}
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
        <StudentRoute
          component={Certificate}
          exact={true}
          path="/myfinishedcourses/:h/certificate/:b"
        />
        <StudentRoute
          component={Certificate}
          exact={true}
          path="/myfinishedformations/:h/certificate/:b"
        />
        <AdminRoute component={AdminAllCourses} exact path="/admin/courses" />
        <AdminRoute
          component={AdminAllFormations}
          exact
          path="/admin/formations"
        />
        {/*this is a test ^|^ */}
        <ProfRoute component={Prof} exact={true} path="/prof/dashboard" />

        <Route component={Head} path="/" />
        <StudentRoute
          component={OneFormation}
          exact={true}
          path="/mystartedformations/:i/learn"
        />
        <Route
          StudentRoute
          component={Quiz}
          exact={true}
          path="/mystartedcourses/:i/learn/quiz"
        />
        <ProfRoute component={ProfAddCourse} exact path="/prof/addCourse" />
        <ProfRoute component={AddPic} exact path="/prof/mycourses/:h/addpic" />

        <ProfRoute component={AddFormation} exact path="/prof/addFormation" />
        <AdminRoute component={NewAdmin} exact path="/admin/newAdmin" />
        <AdminRoute
          component={AdminCourseDetails}
          exact
          path="/admin/courses/:h"
        />
        <AdminRoute component={Students} exact path="/admin/students" />
        <AdminRoute component={Profs} exact path="/admin/profs" />
        <AdminRoute
          component={AdminFormationDetails}
          exact={true}
          path="/admin/formations/:h"
        />
        <ProfRoute
          component={AddChapters}
          exact={true}
          path="/prof/mycourses/:h/addChapters"
        />

        {/* kain chi pb fhad rendering -- jrb / test/chi l3ba katmchi background  */}
        <ProfRoute
          component={ProfCourses}
          exact={true}
          path="/prof/mycourses"
        />
        <ProfRoute
          component={SurveillerCourses}
          exact={true}
          path="/prof/surveiller"
        />
        <ProfRoute
          component={SurveillerOneCourse}
          exact={true}
          path="/prof/surveiller/:h"
        />
        <ProfRoute
          component={AddCourses}
          exact={true}
          path="/prof/myformations/:h/addCourses"
        />
        <ProfRoute
          component={AddPicForFormation}
          exact={true}
          path="/prof/myformations/:h/addpic"
        />
        <ProfRoute
          component={ProfFormations}
          exact={true}
          path="/prof/myformations"
        />
        <AdminRoute
          component={AdminChangePassword}
          exact={true}
          path="/admin/changePassword"
        />
        <StudentRoute
          component={ChangePassword}
          exact={true}
          path="/changePassword"
        />
        <ProfRoute
          component={ProfChangePassword}
          exact={true}
          path="/prof/changePassword"
        />
        <ProfRoute
          component={EditCourse}
          exact={true}
          path="/prof/mycourses/:h"
        />
        <ProfRoute
          component={EditCourse}
          exact={true}
          path="/prof/myformations/:h"
        />
        <StudentRoute component={Profil} exact={true} path="/dashboard" />
        <StudentRoute component={MyCourses} exact={true} path="/mycourses" />
        <StudentRoute
          component={MyStartedCourses}
          exact={true}
          path="/mystartedcourses"
        />
        <StudentRoute
          component={MyFinishedCourses}
          exact={true}
          path="/myfinishedcourses"
        />
        <StudentRoute
          component={MyStartedFormations}
          exact={true}
          path="/mystartedformations"
        />
        <StudentRoute
          component={MyFinishedFormations}
          exact={true}
          path="/myfinishedformations"
        />
        <StudentRoute
          component={MyFormations}
          exact={true}
          path="/myformations"
        />
        <Route component={Enroll} path="/courses/:h" />
        <StudentRoute component={Finish} exact path="/myfinishedcourses/:h" />
        <StudentRoute
          component={FinishFormation}
          exact={true}
          path="/myfinishedformations/:h"
        />
        <StudentRoute component={Start} path="/mycourses/:h" />
        <StudentRoute component={StartFormation} path="/myformations/:h" />
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
        <StudentRoute
          component={Onecourse}
          exact
          path="/mystartedcourses/:h/learn"
        />
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
        <AdminRoute
          component={AdminLogin}
          exact={true}
          inverse={true}
          path="/admin"
        />
        <AdminRoute
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
