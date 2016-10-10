import React from 'react';
import Card from './Card';

var actions = [
	<a href="#">Edit</a>,
	<a href="#">Delete</a>,	
]

export default class Note extends React.Component {
	constructor(props) {
		super(props);		
	}

	render(){		
		return (
			<Card 
				onClick={this.props.onClick}
				key={this.props.id}
				title={this.props.title}
				image={this.props.image}
				actions={actions}>
				<p>{this.props.content}</p>
			</Card>
		)		
	}
}

Note.defaultProps = {		
	image:"",	
	content:"",
	//onClick:function(){}
}