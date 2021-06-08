import React from "react";

function Titredecours(props) {
  return (
    <div>
    
      <p
        style={{
          fontSize: "48px",
          marginLeft: "34%",
          fontFamily: "Architects Daughter",
     
          fontweight:" bold",

lineheight: "59px",
        }}
      >
       {props.name}
      </p>
    </div>
  );
}
export default Titredecours;
/*position: absolute;
width: 580px;
height: 74px;
left: 1013px;
top: 743px;

font-family: Montserrat;
font-style: normal;
font-weight: bold;
font-size: 48px;
line-height: 59px;
text-align: center;

color: #000000;
*/