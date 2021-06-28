import { makeStyles } from "@material-ui/core/styles";
import MyButton from "../usedComponents/MyButton";
import { useLocation } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

let enroll = () => {
  alert("enroll");
};
let enrollFormation = () => {
  alert("enrollFormation");
};
const useStyles = makeStyles({
  root: {
    top: "60%",
    float: "left",
    position: "absolute",
    fontFamily: "Cascadia Code",
    width: "1000x",
    height: "35px",
    left: "70%",
  },
});
function Coursedesc(props) {
  let style = useStyles();
  let delFormation = async () => {
    await axios
      .post(
        "http://localhost:5000/deleteFormation",
        {
          id: document.location.pathname.split("/")[3],
        },
        { headers: { "x-auth-token": localStorage.getItem("currentUser") } }
      )
      .then(
        (res) => {
          alert("successfully deleted");
          console.log(res);
          document.location.href = "/prof/dashboard";
        },
        (err) => {
          alert("erreur : " + (err.statusCode || ""));
          console.log(err.response);
        }
      );
  };
  let delCourse = async () => {
    await axios
      .post(
        "http://localhost:5000/deleteCourse",
        {
          id: document.location.pathname.split("/")[3],
        },
        { headers: { "x-auth-token": localStorage.getItem("currentUser") } }
      )
      .then(
        (res) => {
          alert("successfully deleted");
          console.log(res);
          document.location.href = "/prof/dashboard";
        },
        (err) => {
          alert("erreur : " + (err.statusCode || ""));
          console.log(err.response);
        }
      );
  };
  return (
    <div>
      <MyButton
        bgColor="#0056D2"
        fgColor=" rgba(255, 255, 255, 1)"
        //onClick={props.isFormation ? enrollFormation : enroll}
        url={useLocation().pathname + "/addPic"}
        className={style.root}
        value={`Ajouter/Changer l'image ${
          props.isFormation ? "de la fomation" : "du cours"
        }`}
        //using parameters to lock the choice of prof
        //                        or student in inscription form
      />
      <MyButton
        bgColor="#0056D2"
        marginTop="50px"
        fgColor=" rgba(255, 255, 255, 1)"
        //onClick={props.isFormation ? enrollFormation : enroll}
        className={style.root}
        url={
          useLocation().pathname +
          `${props.isFormation ? "/addCourses" : "/addChapters"}`
        }
        value={`Ajouter les ${
          props.isFormation ? "Cours de la fomation" : "Chapitres du cours"
        }`}
      />
      <MyButton
        bgColor="red"
        marginTop="100px"
        fgColor=" rgba(255, 255, 255, 1)"
        //onClick={props.isFormation ? enrollFormation : enroll}
        className={style.root}
        onClick={props.isFormation ? delFormation : delCourse}
        value={
          props.isFormation ? "supprimer cette formation" : "supprimer ce cours"
        }
        startIcon={<DeleteIcon />}
      />

      <p
        style={{
          position: "absolute",
          fontSize: "48px",
          marginLeft: "20%",
          fontFamily: "Architects Daughter",
          top: "10%",
          fontweight: " bold",

          lineheight: "59px",
        }}
      >
        {props.title}
      </p>

      <p
        style={{
          position: "absolute",
          width: "50%",
          marginLeft: "10%",
          fontFamily: "Comfortaa",
          lineHeight: "1.6",
          fontSize: "17px",

          top: props.title.length >= 40 ? "36%" : "30%",
        }}
      >
        {props.description.split("\n").map((item) => (
          <div>
            {item}
            <br />
          </div>
        ))}
      </p>
      <p
        style={{
          position: "absolute",
          marginLeft: "10%",
          fontFamily: "Architects Daughter",
          fontSize: "30px",
          fontWeight: 200,
          top: props.title.length >= 40 ? "26%" : "20%",

          paddingRight: "100px",
        }}
      >
        {props.isFormation
          ? "A props de cette formation :"
          : "A props de ce cours :"}
      </p>
    </div>
  );
}

export default Coursedesc;
