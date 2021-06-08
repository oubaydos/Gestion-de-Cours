

import React from "react";
import Header from "./header/Header"
import Footer from "./Footer";
import Course from "./Body/course"

function Cours() {
  return (
    <div>
     <header>
      <Header />
  </header>
 <footer><Footer/></footer>
 <Course  desc ="La théorie des graphes est la discipline mathématique et informatique qui étudie les graphes, lesquels sont des modèles abstraits de dessins de réseaux reliant des objets1. Ces modèles sont constitués par la donnée de sommets (aussi appelés nœuds ou points, en référence aux polyèdres), et d'arêtes (aussi appelées liens ou lignes) entre ces sommets ; ces arêtes sont parfois non-symétriques (les graphes sont alors dits orientés) et sont appelées des flèches ou des arcs."name="theorie de graphe" chapnumber={4 } listchap={["nameofchap1","nameofchap1","nameofchap1","nameofchap1"]}/>

    </div>
  );
}

export default Cours;
