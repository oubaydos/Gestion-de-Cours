import React from "react";
// import Header from "../../homePage/header/Header.jsx";
import Title from "./Title";
import Desc from "./Desc";
import Desc1 from "./Desc1";
import Addcourse from "./Addcourse";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Surveiller from "./Surveiller";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function Prof(props) {
  const classes = useStyle();
  // document.body.style.overflow = "scroll";
  return (
    <>
      {/* <header>
        <Header />
      </header> */}
      <div className={classes.root}>
        <div>
          <div onMouseOver={props.onMouseOver}>
            <Grid container direction="row">
              <Grid item xs={2}></Grid>

              <Grid container direction="column" item xs={8}>
                <Grid item xs={12}>
                  <Title />
                </Grid>
                <Grid item xs={8}>
                  <Desc1 />
                </Grid>
                <Grid item xs={8}>
                  <Desc />
                </Grid>

                <Grid
                  container
                  justify="center"
                  alignItems="flex-start"
                  item
                  xs={8}
                >
                  <Grid item xs={6}>
                    <Surveiller />
                  </Grid>

                  <Grid item xs={6}>
                    <Addcourse />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                {" "}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default Prof;
