import React from 'react';
import FilterToolbar from './FilterToolbar';
import ProfileToolbar from './ProfileToolbar';
import { Link } from 'react-router-dom';

export default class FeedToolbar extends React.Component {
	render() {
		const fixedStyle = {
			float: 'left',
			margin: 0,
			overflow: 'hidden',
			width: '100%',
			boxShadow: '0px 10px 10px lightgrey',
		};

		return (
			<React.Fragment>
				<div style={{
					...fixedStyle,
				}}>
					<Link to="/feed">
						<div style={{
							...fixedStyle,
							width: '20%',
							backgroundColor: '#1EA185',
							height: '56px',
							fontSize: '2.5vw',
							padding: '5px',
							textAlign: 'center',
							boxShadow: 'lightgrey 5px 5px 5px',
						
						}}>
							Lunch Planner
						</div>
					</Link>

					<div style={{
						...fixedStyle,
						width: '52%',
						borderRight: '1px solid lightgrey',
					}}>
						<FilterToolbar
							searchFilterFeed={this.props.searchFilterFeed}
						/>
					</div>

					<div style={{
						...fixedStyle,
						width: '28%',
					}}>
						<ProfileToolbar />
					</div>
				</div>
		</React.Fragment>
		);
	}
}
