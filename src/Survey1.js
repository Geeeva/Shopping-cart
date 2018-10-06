import React, {Component} from 'react';
/*import Firebase from 'firebase';
import Uuid from 'uuid';*/
import firebase from "firebase/app";
const uuid = require('uuid');


/*Ovdje za firbase imamo samo 2 stvari ref i set, 

Kada prosljedujemo u bazu podataka putem ref, argumentom koji prosljedjujemo  provjerava da li postoji u bazi ako ga ne pronadje zaminice
ga sa novimm, dakle ako proandje objekat uci ce u taj objekat a, ako ga ne pronadje kreirace novi objekat za nas, dakle ref je samo za 
ocitavanje a set je za postavljanje.

*/
/*UID se ne mijenja vec je smao za jednog usera*/
/*
{
  "rules": {
    ".read": "auth === null",
    ".write": "auth === null"
  }
}*/

const config = {
    apiKey: "AIzaSyBm8MUw3XmWlhgLGucSAoLuaogEr7vZ2T0",
    authDomain: "survey-b30c8.firebaseapp.com",
    databaseURL: "https://survey-b30c8.firebaseio.com",
    projectId: "survey-b30c8",
    storageBucket: "survey-b30c8.appspot.com",
    messagingSenderId: "432994301563"
};

/*if (!firebase.apps.length) {*/
  firebase.initializeApp(config);
/*}*/

class Survey extends Component {

	constructor(props) {
		super(props);

		this.state = {
			uid: uuid.v1(), 
			name: 'KK', 
			answers: {
				answer1: '',
				answer2: '',
				answer3: ''
			},
			isSubmitted: false
		}
	}

	nameSubmit = (event) => {
		//event.preventDefault(); 
		/*let name = this.refs.name.value;*//*Sve sto prosljedujemo kao ref cuva se u objektu ili nizu posznaotm kao refs*/
		let name = this.name.value;
		this.setState({name: name});
		console.log(this.state.name);
	}

	questionSubmit = (event) => {
		//event.preventDefault(); 
		/*Survey ne postoji u bazi podataka kao objekat vec survey23225626(ovom pristupamo sa .ref()) sto nije isto, pa ce se sa 'Survey/' + this.state.uid kreirati*/
		firebase.database().ref('Survey/'+this.state.uid).set({
			name: this.state.name,
			answers: this.state.answers
		});

		this.setState({
			isSubmitted: true
		});

		 /*treba se posle postaviti na true*/

		console.log(this.state.isSubmitted);
	}

	answerSelected = (event) => {
		let answers = this.state.answers;
		/*Za  input polja onChange event je koji se dogadja,  inputa polje pronalazimo preko event.target.name property
		i povezuje se name od tog inputa tako sto mu se dodjeljuje njegov event.target.value*/

		if(event.target.name === 'answer1') {
			answers.answer1 = event.target.value;
		} else if (event.target.name === 'answer2') {
			answers.answer2 = event.target.value;
		} else if (event.target.name === 'answer3') {
			answers.answer3 = event.target.value;
		}

		this.setState({answers: answers});
		console.log(this.state);

	}

	render () {
		let name = '';
		let questions = '';

		if(this.state.name === '' && this.state.isSubmitted === false) {
			name = 
				<div>
					<h1>{'Pls. Let us your name:'}</h1>
					<form onSubmit={this.nameSubmit.bind(this)}>
						<input type="text" placeholder="Your name" ref={input => this.name = input} />{/* ref="name"*/}
					</form>
				</div>;
			questions = '';

		} else if (this.state.name !== '' && this.state.isSubmitted === false) {
			name = <h1>Welcome to Survey, {this.state.name}</h1>;
			questions = 
				<div>
					<h2>Here are some questions: </h2>
					<form onSubmit={this.questionSubmit.bind(this)}>
						<div>
							<label htmlFor="">What kind of courses you like the most?</label> <br/>
							<input type="radio" name="answer1" value="Technology" onChange={this.answerSelected}/>Technology
							<input type="radio" name="answer1" value="Design" onChange={this.answerSelected}/>Design
							<input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected}/>Marketing
						</div>

						<div>
							<label htmlFor="">You are a?</label> <br/>
							<input type="radio" name="answer2" value="Student" onChange={this.answerSelected}/>Stude
							<input type="radio" name="answer2" value="in-job" onChange={this.answerSelected}/>In-job
							<input type="radio" name="answer2" value="Looking-job" onChange={this.answerSelected}/>Looking-job
						</div>

						<div>
							<label htmlFor="">Is online laerning helpful?</label> <br/>
							<input type="radio" name="answer3" value="yes" onChange={this.answerSelected}/>Yes
							<input type="radio" name="answer3" value="no" onChange={this.answerSelected}/>No
							<input type="radio" name="answer3" value="maybe" onChange={this.answerSelected}/>Maybe
						</div>
					</form>
					<input type="submit" value="submit" />
				</div>
		} else if(this.state.isSubmitted === true && this.state.name !== '') {
			name = <h1>Thanks, {this.state.name}</h1>
		}

		return (
			<div>
				{name}
				---------------------------------------
				{questions}
			</div>
		)
	}
}

export default Survey;