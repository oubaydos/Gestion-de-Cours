import React from "react";
import Content from "./Content";
import Copyright from "../../usedComponents/Copyright";
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

function Footer(props) {
  let style = useStyles();
  return (
    <div
      className={
        props.className ? `${props.className} ${style.root}` : style.root
      }
    >
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
    </div>
  );
}
export default Footer;
