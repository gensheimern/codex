import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconSearch from 'material-ui/svg-icons/action/search';


import "./sidebars.css"

export default class SearchFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false,
                  searchWord: '',
                  show: true};

    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);


  }

  handleClick = (event) => {
      event.preventDefault();

      this.setState({
        open: true,
        anchorEl: event.currentTarget,
      });
    };

    handleRequestClose = () => {
      this.setState({
        open: false,
      });
    };

    handleChange = (event) => {
      console.log(event.target.value);
      this.setState({
        searchWord: event.target.value,
      });
    };

    handleSearch(){
      this.props.searchFilterFeed(this.state.searchWord,"Search");
    }

  render() {
    return (
      <div className="SearchFeed">
        <FlatButton
          backgroundColor="#1EA185"
          icon={<IconSearch color="white"/>}
          onClick={this.props.changeShow}
        />
      </div>
    );
  }
}