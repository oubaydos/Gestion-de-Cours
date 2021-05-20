import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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
