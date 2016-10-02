import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import Paper from 'material-ui/Paper';
import DocumentDialog from './DocumentDialog'
var asciidoctor = require('asciidoctor.js')();
var moment = require('moment');



var opal = asciidoctor.Opal;

var options = opal.hash({doctype: 'inline', attributes: ['showtitle']});
var processor = asciidoctor.Asciidoctor();

export default class DocumentCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				fullScreen:false
		};
		this.showDialog = this.showDialog.bind(this)
	}
	
	showDialog(){
		this.setState({fullScreen:true})
	}

	render(){
				
		var html = processor.$convert(this.props.content, options);
		var created = moment(this.props.dateCreated).fromNow()
		var lastModified = moment(this.props.dateModified).fromNow()
		return (
		  <Card style={{verticalAlign:"top"}}>  
		    <CardHeader title = {this.props.title} subtitle={"Last changed " + lastModified}/>		    
		    <CardText>
		    		<span dangerouslySetInnerHTML={{__html:html}}></span>		    	
		    </CardText>
		    <CardActions style={{textAlign:"right"}}>		    	
		    	<FloatingActionButton onClick={this.showDialog}><EditIcon /></FloatingActionButton>
		    </CardActions>
		    <DocumentDialog show={this.state.fullScreen}/>
		  </Card>
		)
	}
}