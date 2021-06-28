import React, { useEffect } from "react";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import Desc from "./Desc";
import Titredecours from "./Titredecours";
import Test from "./Test";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MyButton from "../usedComponents/MyButton";
import Cpp from "../Support/Cpp";
import App from "../Support/App";
import axios from "axios";
let index;

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

function chapnumber(nbr) {
  let s = [];
  for (let i = 1; i <= nbr; i++) s.push("chap" + i.toString());

  return s;
}
//
function chapname(id, listchap) {
  for (let i = 0; i < listchap.length; i++) {
    if (id === i) {
      return listchap[i];
    }
  }
}
let c;
function Course(props) {
  const [count, setCount] = React.useState(0);
  const [passedTest, setPassedTest] = React.useState(false);
  const classes = useStyle();

  const [activeStep, setActiveStep] = React.useState(
    props.currentChapter === undefined ? 0 : props.currentChapter
  );

  const steps = chapnumber(props.chapnumber);
  const FinishCourse = async () => {
    if (!passedTest) {
      return alert("vous devez passer le test avant de terminer le cours");
    }
    try {
      await axios
        .post(
          `http://localhost:5000/finishCourse`,
          {
            id: document.location.pathname.split("/")[2],
          },
          { headers: { "x-auth-token": localStorage.getItem("currentUser") } }
        )
        .then(
          (res) => {
            alert(
              "vous avez terminez le cours, vous pouvez voir votre note dans Mes Cours Terminés après que le prof a corrigé le test"
            );
            return (document.location.href = "/dashboard");
          },
          (err) => {
            alert("error : " + err.response.data.errors);
            console.log(err.response);
          }
        );
    } catch (e) {
      console.log(e);
      alert("erreur");
    }
  };
  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    try {
      await axios
        .post(`http://localhost:5000/setCurrentChapter`, {
          id: document.location.pathname.split("/")[2],
          currentChapter: activeStep + 1,
        })
        .then(
          (res) => {
            console.log("progress saved!");
          },
          (err) => {
            alert("error : " + err.response.data.errors);
            console.log(err.response);
          }
        );
    } catch (e) {
      console.log(e);
      alert("erreur");
    }
  };

  const handleBack = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    try {
      await axios
        .post(`http://localhost:5000/setCurrentChapter`, {
          id: document.location.pathname.split("/")[2],
          currentChapter: activeStep - 1,
        })
        .then(
          (res) => {
            console.log("progress saved!");
          },
          (err) => {
            alert("error : " + err.response.data.errors);
            console.log(err.response);
          }
        );
    } catch (e) {
      console.log(e);
      alert("erreur");
    }
  };
  useEffect(() => {
    if (passedTest) {
      setTimeout(() => {
        document.getElementById("quiz").scrollIntoView();
      }, 100);
    }
  }, [passedTest]);
  const handleStay = () => {
    setActiveStep((prevActiveStep) => prevActiveStep);
  };
  const handleReset = async () => {
    setActiveStep(0);
    try {
      await axios
        .post(`http://localhost:5000/setCurrentChapter`, {
          id: document.location.pathname.split("/")[2],
          currentChapter: 0,
        })
        .then(
          (res) => {
            console.log("progress saved!");
          },
          (err) => {
            alert("error : " + err.response.data.errors);
            console.log(err.response);
          }
        );
    } catch (e) {
      console.log(e);
      alert("erreur");
    }
  };
  /* <App video={props.listvideo[activeStep]} />*/
  if (props.type == "video")
    return (
      <div className={classes.root}>
        <div>
          <div onMouseOver={props.onMouseOver}>
            <Grid container direction="row">
              <Grid item xs={2}></Grid>

              <Grid container direction="row" item xs={8}>
                <Grid item xs={8}>
                  <Title />
                </Grid>
                <Grid item xs={8}>
                  <Titredecours name={props.name} />
                </Grid>
                <Grid
                  item
                  container
                  justify="space-evenly"
                  direction="row"
                  xs={12}
                >
                  <Grid item xs={10}>
                    <App video={props.listvideo[activeStep]} />
                  </Grid>

                  <Grid item xs={2}>
                    {" "}
                    <Stepper
                      activeStep={activeStep}
                      style={{
                        backgroundColor: "rgba(232, 237, 243, 0)",
                        width: "200px",
                        height: "50%",
                        marginTop: "10%",
                      }}
                      orientation="vertical"
                    >
                      {steps.map((label, index) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                          <StepContent>
                            <button
                              onClick={() => {
                                setCount(count + 1);
                              }}
                              style={{
                                width: "200px",
                                background: "#C4C4C4",

                                height: "80px",
                              }}
                            >
                              {chapname(index, props.listchap)}
                            </button>
                            <div className={classes.actionsContainer}>
                              <div>
                                <Button
                                  style={{
                                    background: "#0056D2",
                                    color: "white",
                                  }}
                                  disabled={activeStep === 0}
                                  onClick={handleBack}
                                  className={classes.button}
                                >
                                  Chapitre précédent
                                </Button>

                                {activeStep === steps.length - 1 ? (
                                  <></>
                                ) : (
                                  <Button
                                    style={{ backgroundColor: "#00B9D2" }}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                  >
                                    Chapitre suivant
                                  </Button>
                                )}
                              </div>
                            </div>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={8}>
                <Desc desc={props.desc} />
              </Grid>

              <Grid item xs={2}></Grid>
            </Grid>
          </div>
        </div>

        {activeStep === steps.length - 1 && (
          <div>
            <Grid container direction="row" justify="center">
              <Grid item xs={4}>
                <Button
                  style={{
                    backgroundColor: "#0056D2",
                    color: "white",
                    fontFamily: "Cascadia Code",
                    width: "1000x",
                    height: "35px",
                    left: "100%",
                  }}
                  onClick={handleReset}
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                >
                  Revoir le cours
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  style={{
                    backgroundColor: "#0056D2",
                    color: "white",
                    fontFamily: "Cascadia Code",
                    width: "1000x",
                    height: "35px",
                    left: "35%",
                  }}
                  variant="contained"
                  onClick={() => {
                    setPassedTest(true);
                    // window.open(
                    //   `${document.location.pathname}/quiz` /*props.test*/,
                    //   "_blank"
                    // );
                  }}
                  color="primary"
                  size="small"
                  className={classes.button}
                >
                  passer le test
                </Button>
              </Grid>{" "}
              {passedTest && (
                <Grid item xs={4}>
                  <Button
                    style={{
                      backgroundColor: "#0056D2",
                      color: "white",
                      fontFamily: "Cascadia Code",
                      width: "1000x",
                      height: "35px",
                      right: "30%",
                    }}
                    onClick={FinishCourse}
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                  >
                    terminer le cours
                  </Button>
                </Grid>
              )}
              {passedTest && (
                <iframe
                  id="quiz"
                  src={props.test}
                  width="750"
                  height="749"
                  frameborder="0"
                  marginheight="0"
                  marginwidth="0"
                  title="quiz"
                >
                  Loading…
                </iframe>
              )}
            </Grid>
          </div>
        )}
      </div>
    );
  else if (props.type == "PDF") {
    return (
      <div className={classes.root}>
        <div>
          <div onMouseOver={props.onMouseOver}>
            <Grid container direction="row">
              <Grid item xs={2}></Grid>

              <Grid container direction="row" item xs={8}>
                <Grid item xs={8}>
                  <Title />
                </Grid>
                <Grid item xs={8}>
                  <Titredecours name={props.name} />
                </Grid>
                <Grid
                  item
                  container
                  justify="space-evenly"
                  direction="row"
                  xs={12}
                >
                  <Grid item xs={10}>
                    <Cpp pdf={props.listpdf[activeStep]} />
                  </Grid>

                  <Grid item xs={2}>
                    {" "}
                    <Stepper
                      activeStep={activeStep}
                      style={{
                        backgroundColor: "rgba(232, 237, 243, 0)",
                        width: "200px",
                        height: "50%",
                        marginTop: "10%",
                      }}
                      orientation="vertical"
                    >
                      {steps.map((label, index) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                          <StepContent>
                            <button
                              onClick={() => {
                                setCount(count + 1);
                              }}
                              style={{
                                width: "200px",
                                background: "#C4C4C4",

                                height: "80px",
                              }}
                            >
                              {chapname(index, props.listchap)}
                            </button>
                            <div className={classes.actionsContainer}>
                              <div>
                                <Button
                                  style={{
                                    background: "#0056D2",
                                    color: "white",
                                  }}
                                  disabled={activeStep === 0}
                                  onClick={handleBack}
                                  className={classes.button}
                                >
                                  chapitre précédent
                                </Button>

                                {activeStep === steps.length - 1 ? (
                                  <></>
                                ) : (
                                  <Button
                                    style={{ backgroundColor: "#00B9D2" }}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                  >
                                    Chapitre Suivant
                                  </Button>
                                )}
                              </div>
                            </div>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={8}>
                <Desc desc={props.desc} />
              </Grid>

              <Grid item xs={2}></Grid>
            </Grid>
          </div>
        </div>

        {activeStep === steps.length - 1 && (
          <div>
            <Grid container direction="row" justify="center">
              <Grid item xs={4}>
                <Button
                  style={{
                    backgroundColor: "#0056D2",
                    color: "white",
                    fontFamily: "Cascadia Code",
                    width: "1000x",
                    height: "35px",
                    left: "100%",
                  }}
                  onClick={handleReset}
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                >
                  Revoir le cours
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  style={{
                    backgroundColor: "#0056D2",
                    color: "white",
                    fontFamily: "Cascadia Code",
                    width: "1000x",
                    height: "35px",
                    left: "35%",
                  }}
                  variant="contained"
                  onClick={() => {
                    setPassedTest(true);
                    //window.open(props.test, "_blank");
                  }}
                  color="primary"
                  //href={props.test}
                  size="small"
                  className={classes.button}
                >
                  passer le test
                </Button>
              </Grid>{" "}
              {passedTest && (
                <Grid item xs={4}>
                  <Button
                    style={{
                      backgroundColor: "#0056D2",
                      color: "white",
                      fontFamily: "Cascadia Code",
                      width: "1000x",
                      height: "35px",
                      right: "30%",
                    }}
                    onClick={FinishCourse}
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                  >
                    terminer le cours
                  </Button>
                </Grid>
              )}
            </Grid>
          </div>
        )}
      </div>
    );
  }
}
c = 0;

export const Index = () => {
  return c;
};

export default Course;
