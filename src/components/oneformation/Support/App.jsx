

import React from "react";
import { Player } from "video-react";
export default function App(props) {
  return (
    <Player
      playsInline
      poster="/assets/poster.png"
      src={props.video}
    />
  );
}