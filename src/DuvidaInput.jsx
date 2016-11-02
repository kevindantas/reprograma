
import React, { Component } from 'react'
import AutoComplete from 'material-ui/AutoComplete';
import * as firebase from 'firebase'


export default class DuvidaInput extends Component {

	state = {
    	dataSource: [],
    	dirty: false,
    	duvida: ''
  	}


  	componentDidMount() {
    	this.duvidasRef = firebase.database().ref('duvidas');

    	this.duvidasRef.on('value', snap => {
    		var duvidas = snap.val();
    		var duvidasArr = [];


    		for(var ind in duvidas) {
    			duvidasArr = duvidasArr.concat(duvidas[ind].duvidas)
    		}

    		duvidasArr = duvidasArr.map(duvida => duvida.descricao.trim());

			duvidasArr = duvidasArr.filter((duvida, index, duvidas) => index === duvidas.indexOf(duvida))

			this.setState({ 
				dataSource: duvidasArr
			})
		})
  	}


  	handleFocus() {
  		if(this.state.dirty) return;

  		this.setState({
  			dirty: true
  		})

  		this.props.addNew(this.state.duvida);
  	}




	render() {
	    const textStyles = {
	      color: '#ff8509',
	      hintStyle: {
	        color: '#ff8509'
	      }
	    };

		return (
			<AutoComplete
				onFocus={this.handleFocus.bind(this)}
				onUpdateInput={(texto) => this.setState({duvida: texto}) }
				onNewRequest={(texto) => this.setState({duvida: texto}) }
				fullWidth={true}
	          	textFieldStyle={textStyles}
	          	hintText="Eu queria saber..."
	          	dataSource={this.state.dataSource} />
		);
	}
}