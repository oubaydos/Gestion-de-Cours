import { makeStyles } from "@material-ui/core/styles";
import MyButton from "../../usedComponents/MyButton";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles({
  root: {
    top: "45%",
    float: "left",
    position: "absolute",
    marginLeft: "12%",
    fontFamily: "Cascadia Code",
    width: "1000x",
    height: "35px",

    fontSize: "23px",
    color: "orange", //"#1E3F66",
    //backgroundColor: "yellow",
    textShadow: "1px 1px 0px red",
  },
  author: {
    fontFamily: "Comfortaa",
    fontWeight: 700,
    marginLeft: "4px",
    marginTop: "2px",
  },
  rating: {
    top: "45%",
    float: "left",
    position: "absolute",
    fontFamily: "Cascadia Code",
    left: "57%",
    marginTop: "25px",
  },
});
function Coursedesc(props) {
  const [value, setValue] = useState(null);
  let handleChangeFormation = async (mark) => {
    await axios
      .post(
        `http://localhost:5000/setMarkFormation`,
        { mark, id: document.location.pathname.split("/")[2] },
        {
          headers: { "x-auth-token": localStorage.getItem("currentUser") },
        }
      )
      .then(
        (res) => {
          console.log(res.data);
          console.log(mark);
          setValue(mark);

          alert("rating saved" + value);
          console.log(res);
        },
        (e) => {
          alert("erreur dans le serveur");
        }
      );
  };
  let handleChange = async (mark) => {
    await axios
      .post(
        `http://localhost:5000/setMark`,
        { mark, id: document.location.pathname.split("/")[2] },
        {
          headers: { "x-auth-token": localStorage.getItem("currentUser") },
        }
      )
      .then(
        (res) => {
          console.log(res.data);
          console.log(mark);
          setValue(mark);

          alert("rating saved" + value);
          console.log(res);
        },
        (e) => {
          alert("erreur dans le serveur");
        }
      );
  };
  let style = useStyles();
  return (
    <div>
      <p
        className={style.root}
        style={{
          left: props.rated ? "24%" : props.isFormation ? "27%" : "30%",
        }}
      >
        {props.rated
          ? "vous avez dèja noté ce cours"
          : props.isFormation
          ? "noter la formation : "
          : "noter le cours :"}{" "}
      </p>
      {!props.rated && (
        <Rating
          name="half-rating"
          precision={0.5}
          size="large"
          defaultValue={value}
          readOnly={value !== null}
          className={style.rating}
          onChange={(event, value) => {
            if (props.isFormation) handleChangeFormation(value);
            else handleChange(value);
            console.log(value);
            window.location.reload();
          }}
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
      <p
        style={{
          position: "absolute",
          marginLeft: props.isFormation ? "4%" : "10%",
          marginTop: "25%",
          fontFamily: "Architects Daughter",
          fontSize: props.isFormation ? "25px" : "30px",
          fontWeight: 200,
          top: "20%",

          paddingRight: "100px",
        }}
      >
        {props.isFormation
          ? "vous pouvez consulter vos notes dans les cours de cette formations après que le prof corrige les quiz"
          : "Votre Note : "}
        <p
          style={{
            position: "absolute",
            width: "200%",
            marginLeft: "80%",
            marginTop: "-7px",
            fontFamily: "Comfortaa",
            lineHeight: "1.6",
            fontSize: "20px",
            fontWeight: 500,

            top: "30%",
          }}
        >
          {props.mark} /20
        </p>
      </p>
    </div>
  );
}

export default Coursedesc;
