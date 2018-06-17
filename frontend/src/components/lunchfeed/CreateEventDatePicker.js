import React from 'react';
import DatePicker from 'material-ui/DatePicker';

export default class CreateEventDatePicker extends React.Component{
	render(){
		const today = new Date();
		
		return(
			<div>
				<DatePicker
					ref={ref => this.datePickerRef = ref}
					id="CreateEventDatePicker"
					textFieldStyle={{width:'100%'}}
					autoOk={true}
					hintText="Today"
					minDate={today}
				/>
			</div>
		);
	}
}
