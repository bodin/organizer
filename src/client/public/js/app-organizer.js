import React from 'react';
import ReactDOM from 'react-dom';

import Panel from 'react-bootstrap/lib/Panel';

import Card from './lib/Card';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

function handleClick() {
  alert('You have clicked on me');
}
var actions = [
	<a href="#" target="new_blank">Link 1</a>,
	<a href="#" target="new_blank">Link 2</a>,
	<a href="#" target="new_blank">Link 3</a>	
]
const body = (
	<div>
		<Panel onClick={ handleClick }>
			Basic panel example 2
		</Panel>
		<div className="container">			
			<div className="row">	        
		    	<div className="col-md-6 col-md-offset-3">
		    		<Card 
		    			title="This is a test Card"
		    			image="http://material-design.storage.googleapis.com/publish/v_2/material_ext_publish/0Bx4BSt6jniD7TDlCYzRROE84YWM/materialdesign_introduction.png"
		    			actions={actions}
		    		>
		    			<p>This is a card and I am suppling text for it.</p>
		    		</Card>
		    	</div>
		    </div>
		</div>		
	</div>
)

ReactDOM.render(body, document.getElementById('app'));
