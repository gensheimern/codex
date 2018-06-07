import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconDelete from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField';


export default class SearchBar extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        open: false,
        value: 1,
        searchWord: '',

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

    handleChange = (event) => {
      console.log(event.target.value);
      this.setState({
        searchWord: event.target.value,
      });
        this.props.searchFilterFeed(event.target.value,"Search");
    };

    handleClose(){

      this.props.searchFilterFeed(null,"Search");
      this.props.searchFilterFeed("TimeDown","Filter");
      this.props.changeShow();
      this.setState({
        searchWord: "",
      });
    }

render(){

  return(<div>{this.props.show &&
            <div background-color="#ccff99">

              <FlatButton
                icon={<IconDelete color="white" style={{
                width:"50%"}}/>}
                onClick={this.handleClose}
                style={{float:"right", width:"10%", minWidth:"1%",marginTop:"1%",}}
              />

              <TextField
                 id="text-field-controlled"
                 value={this.state.searchWord}
                 onChange={this.handleChange}
                 style={{float:"right",margin:"2%",marginBottom:"0%",marginTop:"0%", width:"55%", height:"6vh"}}
                 inputStyle={{color:"white"}}
                 onKeyPress={(ev) => {
                    console.log(`Pressed keyCode ${ev.key}`);
                    if (ev.key === 'Enter') {
                          this.props.changeShow();
                      ev.preventDefault();
                    }}}/>
            </div>
          }
        </div>
  )
}



}