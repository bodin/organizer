import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';


export default class NoteDialog extends React.Component {
	constructor(props) {
		super(props);		
	}

	render(){		
		if(this.props.selectedNote == undefined){
			return (
					<Modal show={false} />
			)
		}else{
			return (				
				<Modal show={this.props.selectedNote != undefined} onHide={this.props.onHide}>
		    		<Modal.Header>
		    			<Modal.Title>{this.props.selectedNote.title}</Modal.Title>
		    		</Modal.Header>
	
		    		<Modal.Body>
		    			{this.props.selectedNote.content}
		    		</Modal.Body>
	
		    		<Modal.Footer>
		    			<Button onClick={this.props.onHide}>Close</Button>
		    			<Button bsStyle="primary">Save changes</Button>
		    		</Modal.Footer>
		    	</Modal>
			)
		}
	}
}
