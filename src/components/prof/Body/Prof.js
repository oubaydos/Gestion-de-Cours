import React from "react";
// import Header from "../../homePage/header/Header.jsx";
import Title from "./Title";
import Desc from "./Desc";
import Desc1 from "./Desc1";
import Addcourse, {
  DeleteButton,
  AddFormation,
  ChangePassword,
} from "./Addcourse";

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
              <Grid container direction="column" item xs={12}>
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
                  style={{
                    position: "absolute",
                    left: "10px",
                    bottom: "600px",
                  }}
                >
                  <Grid item xs={4}>
                    <Surveiller />
                  </Grid>

                  <Grid item xs={4}>
                    <Addcourse />
                  </Grid>
                  <Grid item xs={4}>
                    <AddFormation />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={10}
                justify="center"
                alignItems="center"
                item
                xs={4}
                style={{
                  position: "absolute",
                  right: "10px",
                  bottom: "600px",
                }}
              >
                <Grid item xs={6}>
                  <ChangePassword />
                </Grid>
                <Grid item xs={6}>
                  <DeleteButton />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default Prof;
