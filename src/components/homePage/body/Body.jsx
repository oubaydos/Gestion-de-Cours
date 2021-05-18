import React from "react";
import Img from "./Img";
import Title from "./Title";
import Description from "./Description";
import SignUp, { SecondButton } from "./SignUp";
import Course1 from "./Course1";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "left",
    color: "theme.palette.text.secondary",
    backgroundColor: "transparent",
    boxShadow: "0 0 0 0 transparent",
    position: "absolute",
    alignItems: "center",
  },
  list: {
    listStyle: "none",
  },
  li: { marginTop: "10px" },
  liButton: {
    [theme.breakpoints.down("md")]: {
      marginTop: "10%",
    },
    marginTop: "4.5%",
  },
  lii: {
    [theme.breakpoints.down("md")]: {
      marginTop: "100%",
    },
    marginTop: "40%",
    marginLeft: "10%",

    "& > *": {
      fontFamily: "Montserrat",
      fontWeight: 400,
    },
  },
  course: {
    [theme.breakpoints.down("md")]: {
      marginTop: "7%",
    },
    marginTop: "4%",
    marginLeft: "5%",
  },
}));
function Body(props) {
  let style = useStyles();
  return (
    <body className={style.root} onMouseOver={props.onMouseOver}>
      <ol className={style.list}>
        <li className={style.li}>
          <Grid container spacing={1} justify="space-around">
            <Grid item xs={8}>
              <Paper className={style.paper}>
                <ol className={style.list}>
                  <li className={style.li}>
                    <Title />
                  </li>
                  <li className={style.li}>
                    <Description />
                  </li>
                  <li className={style.li}>
                    <SignUp />
                  </li>
                  <li className={style.liButton}>
                    <SecondButton />
                  </li>
                </ol>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={style.paper}>
                <Img />
              </Paper>
            </Grid>
          </Grid>
        </li>
        <li className={style.lii}>
          <h1>Meilleurs Cours</h1>
        </li>
        <li className={style.course}>
          <Course1 />
        </li>
      </ol>
    </body>
  );
}
export default Body;
