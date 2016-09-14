import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ListExample from './components/ListExample';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const App = () => (
	<MuiThemeProvider>
		<ListExample />
	</MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('react-one')
);