import React from "react";
import Img from "./Img";
import Title from "./Title";
import Description from "./Description";
import SignUp, { StartedButton, DoneButton, DeleteButton } from "./SignUp";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

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
  li: { marginTop: "50px" },
  liButton: {
    [theme.breakpoints.down("md")]: {
      marginTop: "20%",
    },
    marginTop: "100px",
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
                      <SignUp />
                    </li>
                    <li className={style.liButton}>
                      <StartedButton />
                    </li>
                    <li style={{ marginTop: "150px" }}>
                      <DoneButton />
                    </li>
                    <li style={{ marginTop: "320px", marginRight: "100px" }}>
                      <DeleteButton />
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
        </ol>
      </div>
    </div>
  );
}
export default Body;
