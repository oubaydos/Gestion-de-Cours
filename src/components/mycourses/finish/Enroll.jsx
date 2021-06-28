import CourseCard from "../../usedComponents/Course";
import Grid from "@material-ui/core/Grid";
import Coursedesc from "./Coursedesc";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import MyButton from "../../usedComponents/MyButton";
function isNumber(num) {
  return !isNaN(num);
}
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    left: "70%",
    top: "25%",
    position: "absolute",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    display: "grid",
    placeItems: "center",
    fontSize: "18px",
  },
}));
function Enroll() {
  const [data, setData] = useState(null);
  const dataSent = {
    id: `${useLocation().pathname.split("/")[2]}`,
  };

  async function getCourse() {
    await axios.post(`http://localhost:5000/getCourse`, dataSent).then(
      async (res) => {
        console.log("res : : : : ");
        console.log(res);
        await axios
          .post(`http://localhost:5000/getMark`, dataSent, {
            headers: { "x-auth-token": localStorage.getItem("currentUser") },
          })
          .then(
            (rst) => {
              let temporary = res.data;
              temporary.mark = rst.data.mark;
              temporary.rated = rst.data.rated;
              setData(temporary);
            },
            (e) => {
              alert("erreur dans le serveur");
            }
          );
      },
      (err) => {
        alert("error : " + err.response.data.errors);
        console.log(err.response);
      }
    );
  }
  useEffect(() => {
    if (data === null) {
      getCourse();
    }
  }, [data]);

  //document.body.style.overflow = "hidden";
  const classes = useStyles();
  return (
    <div>
      {data === null ? (
        <div>loading...</div>
      ) : (
        <div>
          <Grid container>
            <Grid item xs={8}>
              <Coursedesc
                rated={data.rated}
                mark={data.mark}
                title={data.data.title}
                description={data.data.description}
                //enroll = func
              />
            </Grid>
            <Grid className={classes.card} item xs={2}>
              <CourseCard
                link="id"
                img={"http://localhost:5000/addPic/" + data.data.image}
                alt="course1"
                title={data.data.title}
                author={data.teacher}
                rating={
                  data.data.numberOfDoneStudents == 0
                    ? data.data.rating
                    : parseFloat(
                        data.data.rating / data.data.numberOfDoneStudents
                      ).toFixed(2)
                }
              />
              {isNumber(data.mark) && (
                <MyButton
                  value="telecharger votre certificat"
                  url={
                    window.location.pathname + "/certificate/" + data.data.title
                  }
                  style={{ marginTop: "20px" }}
                />
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
export default Enroll;
