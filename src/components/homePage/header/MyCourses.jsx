import React from "react";
import TextButton from "../../usedComponents/TextButton";
import { Hidden } from "@material-ui/core";

function MyCourses() {
  return (
    <Hidden mdDown>
      <TextButton value="Mes cours" url="/mycourses" />
    </Hidden>
  );
}
export default MyCourses;
