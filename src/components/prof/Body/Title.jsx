import React, { useState } from "react";
import axios from "axios";
function Title(props) {
  let [name, setName] = useState(null);
  const headers = {
    "x-auth-token": localStorage.getItem("currentUser"),
  };
  try {
    axios.get(`http://localhost:5000/auth`, { headers: headers }).then(
      (res) => {
        setName(
          res.data.firstName.charAt(0).toUpperCase() +
            res.data.firstName.slice(1) +
            " " +
            res.data.lastName.replace(/(?:^|\s)\S/g, function (a) {
              return a.toUpperCase();
            })
        );
      },
      (err) => {
        let error = err.response.data.msg;
        alert("erreur de code : " + err.response.status + "\n" + error);
        console.log(error);
      }
    );
  } catch (error) {
    console.error("l9it error\n\n\n\n");
  }
  return (
    <>
      {name !== null ? (
        <div style={{ display: "inline" }}>
          <h1
            style={{
              fontFamily: "Sacramento",
              fontSize: "40px",
              fontWeight: 400,
              float: "left",
              paddingRight: "30px",
              display: "inline",
            }}
          >
            Bienvenue cher(e) enseignant(e)
          </h1>
          <h1
            style={{
              fontFamily: "Sacramento",
              fontSize: "40px",
              fontWeight: 400,
              float: "left",
              paddingRight: "200px",
              display: "inline",
            }}
          >
            {name}
          </h1>
        </div>
      ) : (
        <h1
          style={{
            fontFamily: "Sacramento",
            fontSize: "50px",
            fontWeight: 400,
            float: "left",
            paddingRight: "200px",
          }}
        >
          Bienvenue cher(e) enseignant(e)
        </h1>
      )}
    </>
  );
}
export default Title;
