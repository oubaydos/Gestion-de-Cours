import React from "react";
import Img from "./Img";
import Title from "./Title";
import Description from "./Description";
import SignUp, { SecondButton } from "./SignUp";
import Course1 from "./Course1";
import Course2 from "./Course2";
import Course3 from "./Course3";
import Course4 from "./Course4";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

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
    <div>
      <div className={style.root} onMouseOver={props.onMouseOver}>
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
                      {(localStorage.getItem("currentUser") === null ||
                        localStorage.getItem("currentUser") === undefined) && (
                        <SignUp />
                      )}
                    </li>
                    <li className={style.liButton}>
                      {(localStorage.getItem("currentUser") === null ||
                        localStorage.getItem("currentUser") === undefined) && (
                        <SecondButton />
                      )}
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
            <Typography>
              <Link href="/courses?sort=meilleur" underline="none">
                {/* handle BACKEND */}
                <h1 style={{ color: "black" }}>Meilleurs Cours</h1>
              </Link>
            </Typography>
          </li>
          <li className={style.course}>
            <Grid container spacing={1} justify="space-around">
              <Grid item xs={3}>
                <Paper className={style.paper}>
                  <Course1 />
                </Paper>
              </Grid>

              <Grid item xs={3}>
                <Paper className={style.paper}>
                  <Course2 />
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={style.paper}>
                  <Course3 />
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={style.paper}>
                  <Course4 />
                </Paper>
              </Grid>
            </Grid>
          </li>
        </ol>
      </div>
    </div>
  );
}
export default Body;
