import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ListExample from './components/ListExample';
import MobileTearSheet from './components/MobileTearSheet';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const App = () => (
	<MuiThemeProvider>
		<MobileTearSheet>
			<ListExample />
		</MobileTearSheet>
	</MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('react-one')
);