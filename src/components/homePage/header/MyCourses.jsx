import React from "react";
import TextButton from "../../usedComponents/TextButton";
import { Hidden } from "@material-ui/core";

function MyCourses() {
  let isStudent = localStorage.getItem("isStudent");
  isStudent === "true" ? (isStudent = true) : (isStudent = false);
  return (
    <Hidden mdDown>
      <TextButton
        value="Mes cours"
        url={isStudent ? "/mycourses" : "/prof/mycourses"}
      />
    </Hidden>
  );
}
export default MyCourses;
