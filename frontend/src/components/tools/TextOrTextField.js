import React from "react";
import TextField from 'material-ui/TextField';

export default class TextOrTextField extends React.Component {

	render() {
		let XXX = this.props.isTextField;
		
		return(
			<React.Fragment key={XXX +"TextOrTextField"}>
				{XXX ?
					<TextField
						multiLine={true}
						rows={1}
						value={this.props.value}
						onChange={this.props.onChange}
						rowsMax={5}
					/>
				:
					<div>
						<span>
							{this.props.value}
						</span>
					</div>
				}
			</React.Fragment>
		)
	}

}
