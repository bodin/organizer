import React from 'react';

export default class Card extends React.Component {
	constructor(props) {
		super(props);		
	}

	render(){
				
		return (
			<div className="card">
                <div className="card-image">
                    <img className="img-responsive" src="http://material-design.storage.googleapis.com/publish/v_2/material_ext_publish/0Bx4BSt6jniD7TDlCYzRROE84YWM/materialdesign_introduction.png"></img>
                    <span className="card-title">Material Cards</span>
                </div>
                
                <div className="card-content">
                    <p>Cards for display in portfolio style material design by Google.</p>
                </div>
                
                <div className="card-action">
                    <a href="#" target="new_blank">Link</a>
                    <a href="#" target="new_blank">Link</a>
                    <a href="#" target="new_blank">Link</a>
                    <a href="#" target="new_blank">Link</a>
                    <a href="#" target="new_blank">Link</a>
                </div>
            </div>
		)		
	}
}