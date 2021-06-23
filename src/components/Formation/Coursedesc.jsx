import { makeStyles } from "@material-ui/core/styles";
import startFunc from "../../utils/startCourse";

import MyButton from "../usedComponents/MyButton";
const useStyles = makeStyles({
  root: {
    top: "55%",
    float: "left",
    position: "absolute",

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
      {!props.finished && !props.started && (
        <MyButton
          bgColor="#0056D2"
          fgColor="rgba(255, 255, 255, 1)"
          url={"/mystartedcourses/" + props.id + "/learn"}
          onClick={() => {
            startFunc(props.id);
          }}
          className={style.root}
          value="commencer ce cours"
          //using parameters to lock the choice of prof
          //                        or student in inscription form
        />
      )}
      {props.started && (
        <MyButton
          bgColor="#0056D2"
          fgColor="rgba(255, 255, 255, 1)"
          url={"/mystartedcourses/" + props.id + "/learn"}
          className={style.root}
          value="continuer ce cours"
          //using parameters to lock the choice of prof
          //                        or student in inscription form
        />
      )}

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
        {props.Coursename}
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
        {props.desc}
        {props.finished && (
          <div>
            <br />
            <p style={{ color: "#0056D2", fontWeight: 650 }}>
              vous avez dèja términé ce cours
            </p>
          </div>
        )}
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
        Description de cours
      </p>
    </div>
  );
}

export default Coursedesc;
