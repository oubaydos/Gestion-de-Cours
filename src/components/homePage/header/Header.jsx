import React, { useState, useEffect } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import Logout from "./Logout";

import Logo from "./Logo";
import Cours from "./Cours";
import Search from "./Search";
import Dashboard from "./Dashboard";
import MyCourses from "./MyCourses";

function Header() {
  const [logedIn, setLogedIn] = useState(false);
  useEffect(() => {
    if (
      localStorage.getItem("currentUser") !== undefined &&
      localStorage.getItem("currentUser") !== null
    )
      setLogedIn(true);
    console.log("header" + logedIn);
  });
  return (
    <div>
      {logedIn ? <Logout /> : <SignUp />}
      {logedIn ? <Dashboard /> : <SignIn />}
      {logedIn &&
        (localStorage.getItem("isAdmin") === null ||
          localStorage.getItem("isAdmin") === undefined) && <MyCourses />}
      <ContactUs />
      <AboutUs />
      <Logo />
      <Cours />
      {localStorage.getItem("isAdmin") !== "true" &&
        localStorage.getItem("isStudent") !== "false" && <Search />}
    </div>
  );
}
export default Header;
