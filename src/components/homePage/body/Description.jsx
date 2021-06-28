import React from "react";

function Description(props) {
  return (
    <div>
      <p
        style={{
          width: "35%",
          marginLeft: "10%",
          fontFamily: "Comfortaa",
          lineHeight: "1.6",
          fontSize: "17px",
          height: "20%",
        }}
      >
        Nous sommes conscients des conséquences de covid19 sur le Maroc, en
        particulier l'instabilité du système éducatif, mais nous faisons notre
        possible pour vous aider à développer vos compétences et devenir
        l'ingénieur que vous voulez être. notre mission est d'améliorer des vies
        grâce à l'apprentissage.
      </p>
      <p
        style={{
          fontSize: "20px",
          marginLeft: "34%",
          fontFamily: "Architects Daughter",
          fontWeight: 550,
        }}
      >
        Pour tous les Ensiastes.
      </p>
    </div>
  );
}
export default Description;
