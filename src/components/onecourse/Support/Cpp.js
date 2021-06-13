import React from "react";

import AllPagesPDFViewer from "./PDFF/all-pages"
export default function Cpp(props) {
  return (
    <div className="App">
      <div className="all-page-container">
        <AllPagesPDFViewer pdf={props.pdf }/>
      </div>
      </div>
  );
}
