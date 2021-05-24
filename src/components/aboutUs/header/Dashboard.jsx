import React from "react";
import TextButton from "../../usedComponents/TextButton";
import { Hidden } from "@material-ui/core";

function Dashboard() {
  return (
    <Hidden mdDown>
      <TextButton value="Mon Profil" url="/dashboard" />
    </Hidden>
  );
}
export default Dashboard;
