import React from "react";
import Content from "./Content";
import Copyright from "./Copyright";
import Logo from "./Logo";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
// import { useScrollEvent } from "use-scroll-event";
// import { BottomScrollListener } from "react-bottom-scroll-listener";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: "theme.palette.text.secondary",
    backgroundColor: "transparent",
    boxShadow: "0 0 0 0 transparent",
  },
}));

function Footer() {
  // const [bottom, setBottom] = useState(false);
  // const { y } = useScrollEvent({ detectScrolling: true });
  // let finalY = 400;
  // function handleBottom() {
  //   console.log(scrolling, y);
  //   if (bottom === true && y < finalY) setBottom(false);
  //   else {
  //     setBottom(true);
  //     finalY = y;
  //   }
  // }
  let style = useStyles();
  return (
    <div className={style.root}>
      {/* <BottomScrollListener onBottom={handleBottom} /> */}
      {/* {bottom === true && ( */}
      <div>
        <Grid container spacing={1} justify="space-around">
          <Grid item xs={4}>
            <Paper className={style.paper}>
              <Logo />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={style.paper}>
              <Content />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={style.paper}></Paper>
          </Grid>

          <Grid item xs={12} elevation={0}>
            <Paper className={style.paper}>
              <Copyright title="Gestion de cours" />
            </Paper>
          </Grid>
        </Grid>
      </div>
      {/* )} */}
    </div>
  );
}
export default Footer;
