import React from "react";
import { ReactVideo } from "reactjs-media";



function App(props){
    return (
        <div>
            <ReactVideo
                src={props.video}
              
                primaryColor="red"
                // other props
            />
        </div>
    );
};

export default App;

