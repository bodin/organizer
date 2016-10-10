import React from 'react';
import Note from './Note';
import NoteDialog from './NoteDialog';


export default class Notebook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedNote:undefined
		}
		this.showNote = this.showNote.bind(this);
		this.hideNote = this.hideNote.bind(this);
	}
	showNote(note){
		console.log("Showing Note " + JSON.stringify(note))
		this.setState({selectedNote:note})
	}
	hideNote(){
		this.setState({selectedNote:undefined})
	}
	render(){
		
		var showNote = this.showNote;
		
		return (
			<div>				
				<div className="container">			
					<div className="row">	        
				    	<div className="col-md-6 col-md-offset-3">
				    		{this.props.notes.map(function(a, i){
				    			return <Note				    				
				    				key={a.id}
				    				title={a.title}
				    				image={a.image}
				    				content={a.content}
				    				onClick={function(){showNote(a)}}
				    			/>
				    		})}				    		
				    	</div>
				    </div>
				</div>
				<NoteDialog selectedNote={this.state.selectedNote} onHide={this.hideNote}/>		    				  
		    </div>
		)		
	}
}

Notebook.defaultProps = {		
	notes:[]
}