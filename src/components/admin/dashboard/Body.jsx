import React from "react";
import Img from "./Img";
import Title from "./Title";
import Description from "./Description";
import Courses, {
  DeleteButton,
  Students,
  Profs,
  AddButton,
  ChangePassword,
} from "./SignUp";
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
  add: {
    height: "50px",
    width: "100px",
    lineHeight: "50px",
    verticalAlign: "middle",
    textAlign: "center",
    fontFamily: "arial",
    fontSize: "26px",
    fontWeight: "bold",
    color: "white",
    textShadow: "2px 2px #336633",
    boxShadow: "2px 2px #336633",
    border: "1px solid black",
    borderRadius: "12px",
    background:
      "linear-gradient(to bottom right, LawnGreen 15%, green 85%, DarkGreen 90%)",
    "&:hover": {
      textShadow: "1px 1px #336633",
      boxShadow: "1px 1px #336633",
      background:
        "linear-gradient(to bottom right, LawnGreen 5%, green 80%, DarkGreen 85%)",
    },
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
                      <Students />
                    </li>
                    <br />
                    <li className={style.li}>
                      <Profs />
                      <br />
                      <li className={style.li}>
                        <Courses />
                      </li>
                    </li>
                    <li
                      style={{
                        marginTop: "120px",
                        float: "right",
                      }}
                    >
                      <DeleteButton />
                    </li>
                    <li
                      style={{
                        marginTop: "50px",
                        float: "right",
                      }}
                    >
                      <AddButton />
                    </li>
                    <li
                      style={{
                        marginTop: "-20px",
                        float: "right",
                      }}
                    >
                      <ChangePassword />
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
