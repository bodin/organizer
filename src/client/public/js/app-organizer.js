import React from 'react';
import ReactDOM from 'react-dom';

import Panel from 'react-bootstrap/lib/Panel';

import Card from './lib/Card';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

function handleClick() {
  alert('You have clicked on me');
}
const body = (
	<div>
		<Panel onClick={ handleClick }>
			Basic panel example 2
		</Panel>
		<div className="container">			
			<div className="row">	        
		    	<div className="col-md-6 col-md-offset-3">
		    		<Card/>
		    	</div>
		    </div>
		</div>		
	</div>
)

ReactDOM.render(body, document.getElementById('react-two'));
