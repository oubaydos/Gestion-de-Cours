
import React from "react";

function Desc(props) {
  return (
    <div>
      <p
        style={{

          fontFamily: "Architects Daughter",

          fontweight: " bold",

          lineheight: "59px",
          position: "absolute",

          fontSize: "30px",
          left: "77%",
          right: " 0%",
          top: "70%",
          color:" #0056D2"

        }}
      >
        Description  de cours
  </p>
      <p
        style={{

          position: "absolute",
          left: "77%",
          right: " 0%",
          top: "77%",
          bottom: "13.22%",
          fontsize: "40px",
          lineheight: " 62px",
         
          color:" #80868E"
        }}
      >
       {props.desc}
    </p>
    </div>);
}
export default Desc;
