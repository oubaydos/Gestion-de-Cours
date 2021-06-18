import { makeStyles } from "@material-ui/core/styles";
import MyButton from "../usedComponents/MyButton";
import { useLocation } from "react-router-dom";

let enroll = () => {
  alert("enroll");
};
let enrollFormation = () => {
  alert("enrollFormation");
};
const useStyles = makeStyles({
  root: {
    top: "45%",
    float: "left",
    position: "absolute",
    marginLeft: "12%",
    fontFamily: "Cascadia Code",
    width: "1000x",
    height: "35px",
    left: "30%",
  },
});
function Coursedesc(props) {
  let style = useStyles();

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
        //using parameters to lock the choice of prof
        //                        or student in inscription form
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

          top: "30%",
        }}
      >
        {props.description}
      </p>
      <p
        style={{
          position: "absolute",
          marginLeft: "10%",
          fontFamily: "Architects Daughter",
          fontSize: "30px",
          fontWeight: 200,
          top: "20%",

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
