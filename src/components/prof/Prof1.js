import React from "react";
import Header from "./header/Header";
import Footer from "./Footer";
import Prof from "./Body/Prof";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../usedComponents/Copyright";
const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(8),
    marginTop: theme.spacing(17),
    paddingTop: theme.spacing(2),
    display: "grid",
    placeItems: "center",
    fontSize: "18px",
  },
}));
function Prof1() {
  const classes = useStyles();
  document.body.style.overflow = "hidden";

  return (
    <div>
      <header>
        <Header />
      </header>
      <div style={{ marginTop: "150px" }}>
        <Prof />
      </div>
      <div className={classes.footer}>
        <Copyright title="Gestion de Cours" color="black" />
      </div>
    </div>
  );
}

export default Prof1;
