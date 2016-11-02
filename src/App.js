import React, { Component } from 'react';
import * as firebase from 'firebase'
import { Card, CardTitle, CardText }from 'material-ui/Card'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DoneIcon from 'material-ui/svg-icons/action/done';
import DuvidaInput from './DuvidaInput';
import logo from './logo.svg';
import './App.css';

class App extends Component {



  state = {
    dataSource: [],
    duvidas: [{}],
    nome: '',
    snackbarOpen: false,
    sent: false
  }


  constructor() {
    super();

    var config = {
      apiKey: "AIzaSyBV7UpIqEZzBqmYRUxXRrQ3G_t_OG1xTA0",
      authDomain: "reprogama-form.firebaseapp.com",
      databaseURL: "https://reprogama-form.firebaseio.com",
      storageBucket: "reprogama-form.appspot.com",
      messagingSenderId: "93850229248"
    };
    firebase.initializeApp(config);
    this.duvidasRef = firebase.database().ref('duvidas');
  }


  componentDidMount() {
    
  }


  handleUpdateInput() {

  }



  addDuvida(descricao) {
    this.setState({
      duvidas: this.state.duvidas.concat({})
    })
  }



  handleSend = () => {

    var duvidas = [];


    for(let ind in this.refs) {

      let duvidaInput = this.refs[ind];
      let descricao = duvidaInput.state.duvida;

      if(descricao) {
        duvidas.push({
          descricao: duvidaInput.state.duvida
        })
      }


    }


    var requestBody =  {
      nome: this.state.nome,
      duvidas: duvidas
    }

    this.setState({
      snackbarOpen: true,
      sent: true
    })

    this.duvidasRef.push().set(requestBody);
  }


  renderAutoComplete() {

    return this.state.duvidas.map((duvida, i) => (
        <DuvidaInput 
          ref={`duvida${i}`}
          key={i} 
          addNew={this.addDuvida.bind(this)} />
    ))
  }


  renderCardText() {
    const sentStyle = {
      fontSize: 16,
      background: '#8BC34A',
      color: '#fff',
      textAlign: 'center',
      textTransform: 'uppercase'
    }


    const titleStyle = {
      fontSize: 32
    };

    const iconStyle =  {
      color: '#fff',
      width: 210,
      height: 200
    }


  
    if(this.state.sent) {
      return (
        <CardText style={sentStyle} className="Sent">
          <DoneIcon style={iconStyle}  viewBox="0 0 21 20" />
          <h1 style={{fontWeight: 300}}>{`${this.state.nome}, valeu pelas dúvidas ;)`}</h1>
        </CardText>
      )
    }



    return (
      <CardText style={{fontSize: 16}}>
        <TextField 
          floatingLabelStyle={titleStyle}
          fullWidth={true}
          onChange={e => this.setState({nome: e.target.value})}
          floatingLabelText="Nome" />

        <h2> Dúvidas </h2>
        <p>Esse é o momento pra abrir o coração</p>

        { this.renderAutoComplete() }

        <br/>
        <RaisedButton label="Enviar" primary={true} onClick={this.handleSend} />
      </CardText>
    )
  }


  render() {


    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Card className="Form">
          <CardTitle title="Perguntas Reprograma" />

            { this.renderCardText() }

        
        </Card>
      </div>
    );
  }
}

export default App;
