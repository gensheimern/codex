import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class ImageUpload extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       uploadedFileCloudinaryUrl: '',
       uploadedFile: [],
     };
     this.uploadImage = this.uploadImage.bind(this);

   }

   uploadImage(){

      }

   onImageDrop(files) {
     const fd = new FormData();
     fd.append('image',files[0],files[0].name);
     axios.post('http://localhost:5000/api/upload',fd)
       .then(res => {
           console.log(res);
       });

  this.setState({
    uploadedFile: files[0]
  });
  console.log(this.state.uploadedFile + " da isses");

}



  render() {
    return(
      <Dropzone
        multiple={false}
        accept="image/*"
        onDrop={this.onImageDrop.bind(this)}>
        <p>Drop an image or click to select a file to upload.</p>
      </Dropzone>
    )}
}
