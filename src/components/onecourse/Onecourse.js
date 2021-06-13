

import React from "react";
import Header from "./header/Header"
import Footer from "./Footer";
import Course from "./Body/course"
import chap1 from "./data/chap1.pdf";
import chap2 from "./data/chap2.pdf"
import chap3 from "./data/chap3.pdf"
import chap4 from "./data/chap4.pdf"
import vid1 from "./data/vid1.mkv";
import vid2 from "./data/vid2.mkv"
import vid3 from "./data/vid3.mkv"
import vid4 from "./data/vid4.mkv"
function Onecourse() {
  return (
    <div>
     <header>
      <Header />
  </header>
  <footerpdf>
 <Footer/>
</footerpdf>
 
 <Course  type ="PDF"
  desc ="La théorie des graphes est la discipline mathématique et informatique qui étudie les graphes, lesquels sont des modèles abstraits de dessins de réseaux reliant des objets1. Ces modèles sont constitués par la donnée de sommets (aussi appelés nœuds ou points, en référence aux polyèdres), et d'arêtes (aussi appelées liens ou lignes) entre ces sommets ; ces arêtes sont parfois non-symétriques (les graphes sont alors dits orientés) et sont appelées des flèches ou des arcs." 
  name="theorie de graphe" chapnumber={4 } listchap={["nameofchap1","nameofchap1","nameofchap1","nameofchap1"]}
listpdf={[chap1,chap2,chap3,chap4]}
test="https://docs.google.com/forms/d/1tcw-kQuh18396wc92d1PXeeXK3eO1_T_5c7ru2T8GJ8/edit"


  />
{/*try the video example*/}
 {/*<Course  type ="video"
  desc ="La théorie des graphes est la discipline mathématique et informatique qui étudie les graphes, lesquels sont des modèles abstraits de dessins de réseaux reliant des objets1. Ces modèles sont constitués par la donnée de sommets (aussi appelés nœuds ou points, en référence aux polyèdres), et d'arêtes (aussi appelées liens ou lignes) entre ces sommets ; ces arêtes sont parfois non-symétriques (les graphes sont alors dits orientés) et sont appelées des flèches ou des arcs." 
  name="theorie de graphe" chapnumber={4 } listchap={["nameofchap1","nameofchap1","nameofchap1","nameofchap1"]}

listvideo={[vid1,vid2,vid3,vid4]}

test="https://docs.google.com/forms/d/1tcw-kQuh18396wc92d1PXeeXK3eO1_T_5c7ru2T8GJ8/edit"

  />*/}
    </div>
  );
}

export default Onecourse;
