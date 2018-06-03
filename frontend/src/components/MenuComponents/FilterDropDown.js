import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconFilter from 'material-ui/svg-icons/content/filter-list';



export default class FilterDropDown extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        filtername:"sorted by next upcoming Events"
      };
      this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange = (event, index, value) =>{
    this.setState({value:value});
    console.log(value);

    switch(value.toString()) {
            case "1":
         this.props.searchFilterFeed("TimeDown","Sort");
         this.setState({value:value});
      ;break
            case "2":
         this.props.searchFilterFeed("TimeUp","Sort");
         this.setState({value:value});
      ;break
            case '3':
         this.props.searchFilterFeed("NameDown","Sort");
         this.setState({value:value});
      ;break
            case '4':
         this.props.searchFilterFeed("NameUp","Sort");
         this.setState({value:value});
      ;break
            case '5':
         this.props.searchFilterFeed("Oldest","Sort");
         this.setState({value:value});
      ;break
            case '6':
         this.props.searchFilterFeed("Newest","Sort");
         this.setState({value:value});
      ;break
        default:
        this.setState({value:value});
;
      }
    }

render(){

  return(<div>
            <div>
              {/*	<div style={{float:"right", width:"50%"}}>
                  <p>
                    {this.state.filtername}
                  </p>
                </div> */}
              <DropDownMenu
                 value={this.state.value}
                 onChange={this.handleFilterChange}
                 style={{minHeight:"33px",height:"35px" , lineHeight: "36px",
                 float:"right", margin:"0%", fontSize:"8pt"}}
                 iconButton={<IconFilter color="#FFFFFF"/>}
                 iconStyle={{fill: '#757575', paddingTop:"0%"}}
                 labelStyle={{lineHeight: "36px"}}

               >
                <MenuItem value={1} primaryText="TimeDown" />
                <MenuItem value={2} primaryText="TimeUp" />
                <MenuItem value={3} primaryText="NameDown" />
                <MenuItem value={4} primaryText="NameUp" />
                <MenuItem value={5} primaryText="Oldest" />
                <MenuItem value={6} primaryText="Newest" />
              </DropDownMenu>
            </div>

        </div>
  )
}



}