import React from "react";
import Img from "../homePage/body/Img";
import Title from "./Body/Title";
import Foote from "./Foote";
import Description from "./Body/Description";
import Description2 from "./Body/Description2";
import { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FinalCard from "./card/FinalCard";
function Head() {
  return (
    <header>
      <Header />
    </header>
  );
}
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
      <Grid container direction="column" spacing={1} justify="space-around">
        <Grid item xs={12}>
          <div className={style.root} onMouseOver={props.onMouseOver}>
            <div className={style.root} onMouseOver={props.onMouseOver}>
              <ol className={style.list}>
                <li className={style.li}>
                  <Grid container spacing={1} justify="space-around">
                    <Grid item xs={11}>
                      <Paper className={style.paper}>
                        <ol className={style.list}>
                          <li className={style.li}>
                            <Title />
                          </li>
                          <li className={style.li}>
                            <Description />
                          </li>

                          <li className={style.li}>
                            <Description2 />
                          </li>
                        </ol>
                      </Paper>
                    </Grid>

                    <Grid item xs={1}>
                      <Paper className={style.paper}>
                        <Img />
                      </Paper>
                    </Grid>
                  </Grid>
                </li>
                <li className={style.course}></li>
              </ol>
            </div>
          </div>

          <Grid item xs={12}>
            {" "}
            <FinalCard />
          </Grid>
        </Grid>
      </Grid>
      <Foote />
    </div>
  );
}

function AboutUs() {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
  });
  return (
    <Router>
      <Route component={Head} exact path="/aboutus" />
      <Route component={Body} exact path="/aboutus" />
    </Router>
  );
}
export default AboutUs;
