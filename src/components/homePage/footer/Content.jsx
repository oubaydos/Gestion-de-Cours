import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextButton from "../../usedComponents/TextButton";

const useStyles = makeStyles((theme) => ({
  root: {
    listStyle: "none",
    float: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    textDecoration: "none",
    color: "rgb(5, 37, 82)",
  },
}));

function Content(props) {
  let style = useStyles();
  return (
    <ol className={style.root}>
      <li style={{ margin: "10px 0" }}>
        <a className={style.item} href="/aboutus">
          Qui sommes-nous ?
        </a>
      </li>
      <li style={{ margin: "10px 0" }}>
        <a className={style.item} href="/contactus">
          Contactez-nous
        </a>
      </li>
    </ol>
  );
}
export default Content;
