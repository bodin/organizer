import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import Paper from 'material-ui/Paper';
var asciidoctor = require('asciidoctor.js')();
var opal = asciidoctor.Opal;

const DocumentCard = React.createClass({	

	render: function(){
		
		var processor = asciidoctor.Asciidoctor();
		 
		var content = "http://asciidoctor.org[*Asciidoctor*] " +
		    "running on http://opalrb.org[_Opal_] " +
		    "brings AsciiDoc to Node.js!";
		var options = opal.hash({doctype: 'inline', attributes: ['showtitle']});
		var html = processor.$convert(content, options); // <5> 

		return (
		  <Card style={{verticalAlign:"top"}}>  
		    <CardHeader title = {this.props.title} subtitle="6 Items, Last Changed 12/17/2016"/>		    
		    <CardText>
		    		<span dangerouslySetInnerHTML={{__html:html}}></span>		    	
		    </CardText>
		    <CardActions style={{textAlign:"right"}}>		    	
		    	<FloatingActionButton><EditIcon /></FloatingActionButton>
		    </CardActions>
		  </Card>
		)
	}
});

export default DocumentCard;