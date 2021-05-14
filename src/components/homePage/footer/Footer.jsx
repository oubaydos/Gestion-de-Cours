import React from "react";
import Content from "./Content";
import Copyright from "./Copyright";
import Logo from "./Logo";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

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
  let style = useStyles();
  return (
    <div className={style.root}>
      <Grid container spacing={1} justify="space-around">
        <Grid item xs={4}>
          <Paper className={style.paper}>
            <Logo />
          </Paper>
        </Grid>
        <Grid item xs={4} justify="space-around" alignItems="center">
          <Paper className={style.paper}>
            <Content />
          </Paper>
        </Grid>
        <Grid item xs={4} justify="space-around" alignItems="center">
          <Paper className={style.paper}></Paper>
        </Grid>

        <Grid item xs={12} elevation={0}>
          <Paper className={style.paper}>
            <Copyright title="Gestion de cours" />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
export default Footer;
