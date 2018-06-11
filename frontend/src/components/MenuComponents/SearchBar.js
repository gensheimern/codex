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

		return (
			<React.Fragment>
				<div style={{
					padding: 0,
					width: '50%',
					height: '100%',
					float: 'left',
				}}>
					<TextField
						value={this.state.searchWord}
						onChange={this.handleChange}
						style={{
							width: '100%',
							marginBottom: '15px',
						}}
						underlineFocusStyle={{borderBottom: 'none'}}
						inputStyle={{color:"white"}}
						onKeyPress={(ev) => {
							if (ev.key === 'Enter') {
								this.props.changeShow();
								ev.preventDefault();
							}}
						}
						autoFocus={true}
					/>
				</div>
				<FlatButton
					icon={<IconDelete color="white" />}
					onClick={this.handleClose}
					style={{
						padding: 0,
						width: '25%',
						height: '100%',
						float: 'left',
						minWidth: '56px',
					}}
				/>
			</React.Fragment>
		)
	}

}