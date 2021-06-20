import React from "react";
import "../../css/styles.css";
import img1 from "./signature-moi.png";
function Certificate(props) {
  return (
    <body class="bbody">
      <div class="container">
        <div class="logo">Gestion de Cours</div>

        <div class="marquee">Certificat de suivie de Cours</div>

        <div class="assignment">Ce Certificat atteste que </div>

        <div class="person">{props.name || "oubayda hadi"} </div>

        <div class="reason">
          a suivi le cours :
          <br />
          <div class="cours">{props.course || "gestion des entreprises"}</div>
        </div>
        <br />
        <br />
        <div class="signature">signature des fondateurs : </div>
        <img alt="oubayda" src={img1} class="imgSignature" />
      </div>
    </body>
  );
}
export default Certificate;
