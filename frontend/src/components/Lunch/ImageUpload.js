import React from 'react';
import Dropzone from 'react-dropzone';

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
