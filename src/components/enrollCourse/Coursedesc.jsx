import { makeStyles } from "@material-ui/core/styles";
import enroll, { enrollFormation } from "./enrollAcourse";
import MyButton from "../usedComponents/MyButton";
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
        onClick={props.isFormation ? enrollFormation : enroll}
        className={style.root}
        value="intégrer ce cours"
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
