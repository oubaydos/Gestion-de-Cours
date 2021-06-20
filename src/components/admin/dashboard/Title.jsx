import React, { useState } from "react";
import axios from "axios";
function Title(props) {
  return (
    <div style={{ marginTop: "100px" }}>
      <div>
        <h1
          style={{
            fontFamily: "Sacramento",
            fontSize: "50px",
            fontWeight: 400,
            float: "left",
            paddingRight: "200px",
          }}
        >
          Bienvenue !
        </h1>
        <h1
          style={{
            fontFamily: "Sacramento",
            fontSize: "50px",
            fontWeight: 400,
            float: "left",
            paddingRight: "200px",
          }}
        >
          Cher Admin
        </h1>
      </div>
    </div>
  );
}
export default Title;
