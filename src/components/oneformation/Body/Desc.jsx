
import React from "react";

function Desc(props) {
  return (
    <div>
      <p
        style={{

          fontFamily: "Architects Daughter",

          fontweight: " bold",

          lineheight: "59px",
        

          fontSize: "30px",
          color:" #80868E",
          marginLeft:"10%"

        }}
      >
        Description  de cours
  </p>
      <p
        style={{

        
          width :"80%",
          fontsize: "40px",
          lineheight: " 62px",
          marginLeft:"10%",
          color:" #0056D2"
        }}
      >
       {props.desc}
    </p>
    </div>);
}
export default Desc;
