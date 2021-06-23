import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Enroll from "./Enroll";
import MyButton from "../usedComponents/MyButton";
import axios from "axios";

let done = (arr) => arr.includes(false) === false;
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),

    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "10%",
    },
  },
  paper: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),

    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundcolor: "blue",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundcolor: "blue",
    color: "weight",
  },
}));
const useStyle = makeStyles({
  root: {
    top: "55%",
    float: "left",
    position: "absolute",

    fontFamily: "Cascadia Code",
    width: "1000x",
    height: "35px",
    left: "50%",
  },
});
const useStyl = makeStyles({
  root: {
    top: "55%",
    float: "left",
    position: "absolute",

    fontFamily: "Cascadia Code",
    width: "1000x",
    height: "35px",
    left: "10%",
  },
});

export default function Checkout() {
  const [teacher, setTeacher] = useState("");
  const [courses, setCourses] = useState([]);
  const [finished, setFinished] = useState([]);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState([]);
  let getData = async () => {
    try {
      await axios
        .post(
          `http://localhost:5000/getFormationCourses`,
          {
            id: document.location.pathname.split("/")[2],
          },
          { headers: { "x-auth-token": localStorage.getItem("currentUser") } }
        )
        .then(
          async (res) => {
            console.log(res.data.finished);
            setTeacher(res.data.teacher);
            setCourses(res.data.courses);
            setFinished(res.data.finished);
            setLoading(false);
            setStarted(res.data.started);
          },
          (err) => {
            let error = "";
            for (let i of err.response.data.errors) {
              error += i.param + " : " + i.msg + "\n\n";
            }
            alert("erreur de code : " + err.response.status + "\n" + error);
            console.log(error);
          }
        );
    } catch (error) {
      console.error("l9it error\n\n\n\n");
      console.error(error);
    }
  };
  useEffect(() => {
    if (
      loading ||
      finished.length === 0 ||
      teacher === "" ||
      courses.length === 0 ||
      started.length === 0
    ) {
      setTimeout(() => getData(), 800);
    }
  }, [loading, finished, teacher, courses, started]);

  const classes = useStyles();
  const styles = useStyl();
  const style = useStyle();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handlereset = () => {
    setActiveStep(0);
  };
  const finishFormation = async () => {
    try {
      await axios
        .post(
          `http://localhost:5000/finishFormation`,
          {
            id: document.location.pathname.split("/")[2],
          },
          { headers: { "x-auth-token": localStorage.getItem("currentUser") } }
        )
        .then(
          (res) => {
            alert(
              "vous avez terminez la formation, vous pouvez voir votre note dans Mes Formation Terminées après que le prof a corrigé les tests"
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
  return (
    <div>
      {loading ||
      finished.length === 0 ||
      teacher === "" ||
      courses.length === 0 ||
      started.length === 0 ? (
        <div>loading...</div>
      ) : (
        <div className={classes.buttons}>
          {activeStep !== 0 && (
            <MyButton
              onClick={handleBack}
              className={styles.root}
              bgColor="#0056D2"
              fgColor=" rgba(255, 255, 255, 1)"
              value="Back"
            >
              Back
            </MyButton>
          )}
          <Enroll
            finished={finished[activeStep]}
            started={started[activeStep]}
            desc={courses[activeStep].description}
            Coursename={courses[activeStep].title}
            link="id"
            id={courses[activeStep]._id}
            img={"http://localhost:5000/addPic/" + courses[activeStep].image}
            alt="course1"
            title={courses[activeStep].title}
            author={teacher}
            rating={courses[activeStep].rating}
          />
          {activeStep === courses.length - 1 &&
            done(finished) && ( //nbrcourse-1
              <div>
                <MyButton
                  variant="contained"
                  color="primary"
                  onClick={finishFormation}
                  className={style.root}
                  bgColor="#0056D2"
                  fgColor=" rgba(255, 255, 255, 1)"
                  value="terminer la formation"
                  marginTop="80%"
                />
              </div>
            )}
          {activeStep !== courses.length - 1 && ( //nbrcourse-1
            <MyButton
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={style.root}
              bgColor="#0056D2"
              fgColor=" rgba(255, 255, 255, 1)"
              value="next"
            />
          )}
        </div>
      )}
    </div>
  );
}
