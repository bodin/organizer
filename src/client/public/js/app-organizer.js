import React from 'react';
import ReactDOM from 'react-dom';

import Notebook from './lib/Notebook';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

var note = {
	id:1,
	title:"This is a test",
	content:"This is my content",
}

ReactDOM.render(<Notebook notes={[note]}/>, document.getElementById('app'));
