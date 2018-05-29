import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconSearch from 'material-ui/svg-icons/action/search';
import IconDelete from 'material-ui/svg-icons/navigation/close';
import IconFilter from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


export default class SearchBar extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        open: false,
        value: 1,
        searchWord: '',

    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleFilterChange = (event, index, value) =>{
    this.setState({value:value});
    console.log(value);

    switch(value.toString()) {
            case "1":
         this.props.searchFilterFeed("TimeDown","Filter");
         this.setState({value:value});
      ;break
            case "2":
         this.props.searchFilterFeed("TimeUp","Filter");
         this.setState({value:value});
      ;break
            case '3':
         this.props.searchFilterFeed("NameDown","Filter");
         this.setState({value:value});
      ;break
            case '4':
         this.props.searchFilterFeed("NameUp","Filter");
         this.setState({value:value});
      ;break
            case '5':
         this.props.searchFilterFeed("Oldest","Filter");
         this.setState({value:value});
      ;break
            case '6':
         this.props.searchFilterFeed("Newest","Filter");
         this.setState({value:value});
      ;break
        default:
        this.setState({value:value});
;
      }
    }
    handleSearch(){
      this.props.searchFilterFeed(this.state.searchWord,"Search");
    }

    handleChange = (event) => {
      console.log(event.target.value);
      this.setState({
        searchWord: event.target.value,
      });
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
              <DropDownMenu
                 value={this.state.value}
                 onChange={this.handleFilterChange}
                 style={{ width: "30%",
                 float:"left", margin:"0%", fontSize:"8pt"}}
                 autoWidth={false}
               >
                <MenuItem value={1} primaryText="TimeDown" />
                <MenuItem value={2} primaryText="TimeUp" />
                <MenuItem value={3} primaryText="NameDown" />
                <MenuItem value={4} primaryText="NameUp" />
                <MenuItem value={5} primaryText="Oldest" />
                <MenuItem value={6} primaryText="Newest" />
              </DropDownMenu>

              <TextField
                 id="text-field-controlled"
                 value={this.state.searchWord}
                 onChange={this.handleChange}
                 style={{float:"left",margin:"0%",marginTop:"4%", width:"40%", height:"6vh"}}
                />

              <FlatButton
                icon={<IconDelete style={{
                width:"50%"}}/>}
                onClick={this.handleClose}
                style={{float:"left", width:"10%", minWidth:"15%",marginTop:"2%",}}
              />

              <FlatButton
                icon={<IconSearch style={{
                width:"50%"}}/>}
                onClick={this.handleSearch}
                style={{float:"left", width:"10%", minWidth:"15%",marginTop:"2%",}}
              />
            </div>
          }
        </div>
  )
}



}