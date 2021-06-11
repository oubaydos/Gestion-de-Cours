import axios from 'axios';
import React,{Component} from 'react'; 
import Button from '@material-ui/core/Button';

import { createMuiTheme } from '@material-ui/core/styles';
class Upload extends Component { 

    state = { 
  
      // Initially, no file is selected 
      selectedFile: null
    }; 
     
    // On file select (from the pop up) 
    onFileChange = event => { 
      // Update the state 
      this.setState({ selectedFile: event.target.files[0] }); 
    }; 
     
    // On file upload (click the upload button) 
    onFileUpload = () => { 
      // Create an object of formData 
      const formData = new FormData(); 
     
      // Update the formData object 
      formData.append( 
        "myFile", 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      ); 
     
      // Details of the uploaded file 
      console.log(this.state.selectedFile); 
     
      // Request made to the backend api 
      // Send formData object 
      axios.post("", formData); 
    }; 
     
    // File content to be displayed after 
    // file upload is complete 
    fileData = () => { 
      if (this.state.selectedFile) { 
          
        return ( 
          <div> 
            <h2>les Détails du fichier selectionné</h2> 
            <p>nom de fichier: {this.state.selectedFile.name}</p> 
            <p> Type de fichier: {this.state.selectedFile.type}</p> 
            <p> 
              Last Modified:{" "} 
              {this.state.selectedFile.lastModifiedDate.toLocaleDateString()} 
            </p> 
          </div> 
        ); 
      } else { 
        return ( 
          <div> 
            <br /> 
            
          </div> 
        ); 
      } 
    }; 
     
    render() { 

      return ( 
        <div> 
          
            
            <div> 
            <p style={{color: "rgba(0, 86, 210, 1)"}}>{this.props.type}</p>
                <input type="file" onChange={this.onFileChange} /> 
                <Button
                
               
                 onClick={this.onFileUpload}> 
                  Upload! 
                </Button> 
            </div> 
          {this.fileData()} 
        </div> 
      ); 
    } 
  } 
  
  export default Upload; 