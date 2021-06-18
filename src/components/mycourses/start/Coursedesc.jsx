import { makeStyles } from "@material-ui/core/styles";
import startFunc from "../../../utils/startCourse";
import startFormationFunc from "../../../utils/startFormation";
import MyButton from "../../usedComponents/MyButton";
import unenrollFunc from "../../../utils/unenrollCourse";
import unenrollFormationFunc from "../../../utils/unenrollFormation";
let start = () => {
  startFunc(document.location.pathname.split("/")[2]);
};
let enrollFormation = () => {
  startFormationFunc(document.location.pathname.split("/")[2]);
};
let unenrollFormation = () => {
  unenrollFormationFunc(document.location.pathname.split("/")[2]);
};
let unenroll = () => {
  unenrollFunc(document.location.pathname.split("/")[2]);
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
    left: "25%",
  },
  second: {
    top: "45%",
    float: "left",
    position: "absolute",
    marginLeft: "12%",
    fontFamily: "Cascadia Code",
    width: "1000x",
    height: "35px",
    left: "43%",
  },
});
function Coursedesc(props) {
  let style = useStyles();

  return (
    <div>
      <MyButton
        bgColor="#0056D2"
        fgColor=" rgba(255, 255, 255, 1)"
        onClick={props.isFormation ? enrollFormation : start}
        className={style.root}
        value={
          props.isFormation ? "Commencez cette formation" : "Commencez ce cours"
        }
        //using parameters to lock the choice of prof
        //                        or student in inscription form
      />
      <MyButton
        bgColor="#FBEEC1"
        fgColor="black"
        onClick={props.isFormation ? unenrollFormation : unenroll}
        className={style.second}
        value={"se désinscrire"}
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
