import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DocumentCard from './components/DocumentCard';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const App = () => (
	<MuiThemeProvider>
		<div>
			<DocumentCard />
			<DocumentCard />
			<DocumentCard />
			<DocumentCard />
		</div>
	</MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('react-one')
);