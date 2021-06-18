import React, { useState, useEffect } from "react";
import Header from "./header/Header";
import Footer from "./Footer";
import Course from "./Body/course";
import chap1 from "./data/chap1.pdf";
import chap2 from "./data/chap2.pdf";
import chap3 from "./data/chap3.pdf";
import chap4 from "./data/chap4.pdf";
import vid1 from "./data/vid1.mkv";
import vid2 from "./data/vid2.mkv";
import vid3 from "./data/vid3.mkv";
import vid4 from "./data/vid4.mkv";
import Chapters from "../../utils/getChapters";
import axios from "axios";
function getArray(n) {
  let arr = [];
  for (let i = 0; i < n; i++) arr.push("chapitre " + (i + 1));
  return arr;
}
function getChapters(n) {
  let arr = [];
  for (let i = 0; i < n; i++)
    arr.push(
      `http://localhost:5000/getChapters/${
        document.location.pathname.split("/")[2]
      }/${i}`
    );
  return arr;
}
function Onecourse() {
  const [chapitres, setChapitres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const dataSent = {
    id: `${document.location.pathname.split("/")[2]}`,
  };

  async function getCourse() {
    await axios.post(`http://localhost:5000/getCourse`, dataSent).then(
      async (res) => {
        console.log("res : : : : ");
        console.log(res);
        setData(res.data);
        await axios
          .post(`http://localhost:5000/getCurrentChapter`, dataSent, {
            headers: {
              "x-auth-token": `${localStorage.getItem("currentUser")}`,
            },
          })
          .then(
            (res) => {
              setCurrentChapter(res.data.currentChapter);
              setLoading(false);
            },
            (err) => {
              alert("error : " + err.response.data.errors);
              console.log(err.response);
            }
          );
        setLoading(false);
      },
      (err) => {
        alert("error : " + err.response.data.errors);
        console.log(err.response);
      }
    );
  }
  useEffect(() => {
    if (loading) {
      getCourse();
    }
  }, [loading]);
  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : (
        <div>
          {data.data.type === "pdf" ? (
            <Course
              type={"PDF"}
              desc={data.data.description} //"La théorie des graphes est la discipline mathématique et informatique qui étudie les graphes, lesquels sont des modèles abstraits de dessins de réseaux reliant des objets1. Ces modèles sont constitués par la donnée de sommets (aussi appelés nœuds ou points, en référence aux polyèdres), et d'arêtes (aussi appelées liens ou lignes) entre ces sommets ; ces arêtes sont parfois non-symétriques (les graphes sont alors dits orientés) et sont appelées des flèches ou des arcs."
              name={data.data.title} //"theorie de graphe"
              chapnumber={data.data.numberOfChapters}
              listchap={getArray(data.data.numberOfChapters)}
              listpdf={getChapters(data.data.numberOfChapters)}
              currentChapter={currentChapter}
              test={data.data.quiz}
            />
          ) : (
            <Course
              type="video"
              desc={data.data.description}
              name={data.data.title}
              chapnumber={data.data.numberOfChapters}
              listchap={getArray(data.data.numberOfChapters)}
              currentChapter={currentChapter}
              listvideo={getChapters(data.data.numberOfChapters)}
              test={data.data.quiz}
            />
          )}
        </div>
      )}
    </div>
  );
  // return (
  //   <div>
  //     {/* {loading ? (
  //         <h1 style={{ position: "fixed", top: "50%", left: "50%" }}>
  //           loading...
  //         </h1>
  //       ) : ( */}
  //     <Course
  //       type="gg" //{data.type}
  //       desc="gg" //{data.description}
  //       name="hh" //{data.title}
  //       chapnumber={4} //{data.numberOfChapters}
  //       listchap={["nameofchap1", "nameofchap1", "nameofchap1", "nameofchap1"]}
  //       listpdf={[
  //         chap1,
  //         chap2, //"http://localhost:5000/getChapters/60c8ae610bbeed43187e501a/0",
  //         chap3,
  //         chap4,
  //       ]}
  //       test="https://docs.google.com/forms/d/1tcw-kQuh18396wc92d1PXeeXK3eO1_T_5c7ru2T8GJ8/edit"
  //     />
  //     {/* )} */}

  //     {/*try the video example*/}
  //     {/* <Course
  //       type="video"
  //       desc="La théorie des graphes est la discipline mathématique et informatique qui étudie les graphes, lesquels sont des modèles abstraits de dessins de réseaux reliant des objets1. Ces modèles sont constitués par la donnée de sommets (aussi appelés nœuds ou points, en référence aux polyèdres), et d'arêtes (aussi appelées liens ou lignes) entre ces sommets ; ces arêtes sont parfois non-symétriques (les graphes sont alors dits orientés) et sont appelées des flèches ou des arcs."
  //       name="theorie de graphe"
  //       chapnumber={4}
  //       listchap={["nameofchap1", "nameofchap1", "nameofchap1", "nameofchap1"]}
  //       listvideo={[vid1, vid2, vid3, vid4]}
  //       test="https://docs.google.com/forms/d/1tcw-kQuh18396wc92d1PXeeXK3eO1_T_5c7ru2T8GJ8/edit"
  //     /> */}
  //   </div>
  // );
}

export default Onecourse;
