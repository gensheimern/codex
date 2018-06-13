import React from 'react';
import Dropzone from 'react-dropzone';

export default class ImageUpload extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       uploadFile: [],
       dropZoneText: "Drop an image or click to select a lunchcard to upload.",
       style: {
         border:"1px solid rgba(0, 0, 0, 0.3)",
         width:"90%",
         marginLeft:"5%",
         marginRight:"5%",
         marginTop:"20px",
         paddingTop:"25px",
         paddingBottom:"25px",
         color:"rgba(0, 0, 0, 0.3)",

       },
     };

   }

   onImageDrop(files) {
     this.props.handleFile(files);
     this.setState({style: {
       border:"2px solid green",
       width:"80%",
       marginLeft:"10%",
       marginLeft:"10%",
       marginTop:"20px",
       paddingTop:"25px",
       paddingBottom:"25px",
       color:"rgba(0, 0, 0, 0.3)",

     },
      dropzoneText: "Successfully uploaded.",
      uploadFile: files,
      })

  this.setState({
    uploadedFile: files[0]
  });
  console.log(this.state.uploadedFile + " da isses");

}



  render() {
    return(
      <Dropzone
        style={this.state.style}
        multiple={false}
        accept="image/*"
        onDrop={this.onImageDrop.bind(this)}>
        {this.state.dropZoneText}
      </Dropzone>

    )}
}
