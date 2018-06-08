import React from 'react';
import TextField from 'material-ui/TextField';


export default class DesktopSearchBar extends React.Component {

    constructor(props) {
    	super(props);
		
		this.state = {
        	open: false,
        	value: 1,
        	searchWord: '',
    	};
	
		this.handleChange = this.handleChange.bind(this);
	}

    handleChange = (event) => {
    	this.setState({
        	searchWord: event.target.value,
    	});
        this.props.searchFilterFeed(event.target.value,"Search");
    };

	render(){
		return (
		<div>
			{/*<IconSearch color="black" style={{
				marginTop: '65px',
			}} />*/}

			<TextField
                id="text-field-controlled"
                value={this.state.searchWord}
                onChange={this.handleChange}
				inputStyle={{color:"darkgrey"}}
				hintText="SEARCH"
            />
		</div>
		)
	}
}