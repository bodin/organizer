import React from 'react';

export default class Card extends React.Component {
	constructor(props) {
		super(props);		
	}

	render(){
		var image;
		if(this.props.image){
			image = (<img className="img-responsive" src={this.props.image}></img>)
		}
		return (
			<div className="card">
                <div className="card-image">
                    {image}
                    <span className="card-title">{this.props.title}</span>
                </div>
                
                <div className="card-content">
                	{this.props.children}
                </div>
                
                <div className="card-action">
                	{this.props.actions.map(function(a){
                		return a;
                	})}                    
                </div>
            </div>
		)		
	}
}

Card.defaultProps = {
	title:"",
	actions:[]
}