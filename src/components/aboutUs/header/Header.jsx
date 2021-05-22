import React from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ContactUs from "./ContactUs";

import Logo from "./Logo";
import Cours from "./Cours";
import Search from "./Search";

function Header() {
  return (
    <div>
      <SignUp />
      <SignIn />
      <ContactUs />
      

      <Logo />
      <Cours />
      <Search />
    </div>
  );
}
export default Header;
