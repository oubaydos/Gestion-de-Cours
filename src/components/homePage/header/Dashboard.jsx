import React from "react";
import TextButton from "../../usedComponents/TextButton";
import { Hidden } from "@material-ui/core";

function Dashboard() {
  let isStudent = localStorage.getItem("isStudent");
  isStudent === "true" ? (isStudent = true) : (isStudent = false);
  return (
    <Hidden mdDown>
      <TextButton
        value="Mon Profil"
        url={isStudent ? "/dashboard" : "/prof/dashboard"}
      />
    </Hidden>
  );
}
export default Dashboard;
