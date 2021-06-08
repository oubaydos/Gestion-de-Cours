import React from "react";

import AllPagesPDFViewer from "./PDFF/component/pdf/all-pages"

/* This is required only if the project file is located 
inside the app. Otherwise you can use the external link of the pdf file*/




export default function Cpp(props) {
  return (
    <div className="App">
      <div className="all-page-container">
        <AllPagesPDFViewer pdf={props.pdf }/>
      </div>

    
    </div>
  );
}
