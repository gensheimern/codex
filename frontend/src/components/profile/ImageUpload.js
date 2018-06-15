import React from 'react';
import Dropzone from 'react-dropzone';

export default class ImageUpload extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       uploadFile: [],
       style: {
         border:"1px solid rgba(0, 0, 0, 0.3)",
         width:"100px",
         height:"100px",
         borderRadius:"50%",
         marginLeft:"auto",
         marginRight:"auto",
         color:"rgba(0, 0, 0, 0.3)",
         position:"fixed",

       },
     };

   }

   onImageDrop(files) {
     this.props.handleFile(files);
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
        onClick={this.onImageDrop.bind(this)}>
      </Dropzone>

    )}
}
