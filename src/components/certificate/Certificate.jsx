import React, { useState, useEffect } from "react";
import "../../css/styles.css";
import img1 from "./signature-moi.png";
import img2 from "./signature-hajar.png";
import MyButton from "../usedComponents/MyButton";
import Header from "../homePage/header/Header";
import axios from "axios";
function generateRandom(desiredMaxLength) {
  var randomNumber = "";
  for (var i = 0; i < desiredMaxLength; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
}
function Certificate(props) {
  const [name, setName] = useState(null);
  const [mark, setMark] = useState(null);
  const [print, setPrint] = useState(false);
  async function getInfo() {
    if (document.location.pathname.split("/")[1] === "myfinishedformations") {
      axios
        .get(`http://localhost:5000/auth`, {
          headers: { "x-auth-token": localStorage.getItem("currentUser") },
        })
        .then(
          (res) => {
            setName(
              res.data.firstName.charAt(0).toUpperCase() +
                res.data.firstName.slice(1) +
                " " +
                res.data.lastName.replace(/(?:^|\s)\S/g, function (a) {
                  return a.toUpperCase();
                })
            );
            setMark("le cours n'est pas encore noté par le prof");
          },
          (err) => {
            let error = err.response.data.msg;
            alert("erreur de code : " + err.response.status + "\n" + error);
            console.log(error);
          }
        );
    } else
      await axios
        .post(
          "http://localhost:5000/getStudentNameAndMark",
          { id: document.location.pathname.split("/")[2] },
          { headers: { "x-auth-token": localStorage.getItem("currentUser") } }
        )
        .then(
          (res) => {
            setMark(res.data.mark);
            setName(res.data.name);
          },
          (err) => {
            alert("erreur : " + (err.statusCode || ""));
            console.log(err.response);
          }
        );
  }
  useEffect(() => {
    if (name === null || mark === null) {
      getInfo();
    }
  }, [name, mark]);
  return (
    <div id="div">
      {name === null || mark === null ? (
        <div>loading...</div>
      ) : (
        <div>
          {!print && (
            <header>
              <Header />
            </header>
          )}

          <body class="bbody">
            <div class="container">
              <div class="logo">Gestion de Cours</div>

              <div class="marquee">
                Certificat de suivie de{" "}
                {document.location.pathname.split("/")[1] ===
                "myfinishedformations"
                  ? "Formation"
                  : "Cours"}
              </div>

              <div class="assignment">Ce Certificat atteste que </div>

              <div class="person">{name} </div>

              <div class="reason">
                a suivi{" "}
                {document.location.pathname.split("/")[1] ===
                "myfinishedformations"
                  ? "la formation"
                  : "le cours"}{" "}
                :
                <br />
                <div class="cours">
                  {document.location.pathname
                    .split("/")[4]
                    .replace(/%20/g, " ")}
                </div>
                <br />
                {mark !== "le cours n'est pas encore noté par le prof" && (
                  <div>
                    et a obtenu une note de :<br /> {mark}/20
                  </div>
                )}
              </div>
              <br />
              <br />
              <div class="signature">signature des fondateurs : </div>
              <div>
                <p class="nameSignature">Obaydah Bouifadene</p>
                <img alt="oubayda" src={img1} class="imgSignature" />
              </div>
              <div>
                <p class="secName">Hajar Dami</p>
                <img alt="oubayda" src={img2} class="secImg" />
              </div>
              <p class="id">id de certificat : {generateRandom(24)}</p>
            </div>
          </body>
          {!print && (
            <MyButton
              className="mybutton"
              value="telecharger"
              style={{ position: "fixed", right: "15px" }}
              onClick={() => {
                setPrint(true);
                setTimeout(() => {
                  window.print();
                  setPrint(false);
                }, 100);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
export default Certificate;
