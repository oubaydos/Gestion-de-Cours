import React from "react";
import Copyright from "../usedComponents/Copyright";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    width: "941px",
    height: "50px",
    left: " 500px",
    top: "1000px",
    bottom: "400px",
    fontSize: "20px",
  },
}));

function Foote(props) {
  let style = useStyles();
  return (
    <div className={style.root}>
      <Link href="/">
        <Copyright title="Gestion de Cours - ENSIAS" color="black" />
      </Link>
    </div>
  );
}
export default Foote;
