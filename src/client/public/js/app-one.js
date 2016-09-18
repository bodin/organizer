import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DocumentCard from './components/DocumentCard';
import { Grid, Row, Cell } from 'react-inline-grid-15';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const App = () => (
	<MuiThemeProvider>
		<Grid>
			<Row is="center">
				<Cell is="3 tablet-4 phone-4"><DocumentCard title='Hi1'/></Cell>
				<Cell is="3 tablet-4 phone-4"><DocumentCard title='Hi2'/></Cell>
				<Cell is="3 tablet-4 phone-4"><DocumentCard title='Hi3'/></Cell>
				<Cell is="3 tablet-4 phone-4"><DocumentCard title='Hi4'/></Cell>
			</Row>
		</Grid>
	</MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('react-one')
);