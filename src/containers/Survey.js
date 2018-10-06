import React, {Component} from 'react';
import './Survey.css';
import first from '.././assets/images/food.png';
import third from '.././assets/images/third.png';
import foodIcons from '.././assets/images/food-icons.svg';
var firebase = require('firebase/app');
var firebaseAuth = require('firebase/auth');
var firebaseDatabase = require('firebase/database');
var uuid = require('uuid');



var config = {
    apiKey: "AIzaSyC92RTibuvc4bzbZt2H28Z3lrsx3oRaosM",
    authDomain: "survey-91d3e.firebaseapp.com",
    databaseURL: "https://survey-91d3e.firebaseio.com",
    projectId: "survey-91d3e",
    storageBucket: "survey-91d3e.appspot.com",
    messagingSenderId: "1031923312610"
};


firebase.initializeApp(config);

class Survey extends Component {

	constructor(props) {
		super(props);

		this.state = {
			uid: uuid.v1(), 
			name: '', 
			answers: {
				answer1: '',
				answer2: '',
				answer3: '',
				answer4: '',
				answer5: '',
			},
			isSubmitted: false
		};
	}

	nameSubmit = (event) => {
		event.preventDefault(); 
		var name = this.name.value;
		this.setState({name: name});
	}

	questionSubmit = (event) => {
		event.preventDefault(); 
		firebase.database()
		.ref(`Survey/${this.state.uid}`)
		.set({
			name: this.state.name,
			answers: this.state.answers
		})
		.catch(error => console.log(error));

		this.setState({
			isSubmitted: true
		});

		console.log(event.target.value);

	}

	answerSelected = (event) => { 
		var answers = this.state.answers;

		if(event.target.name === 'answer1') {
			answers.answer1 = event.target.value;
		} else if (event.target.name === 'answer2') {
			answers.answer2 = event.target.value;
		} else if (event.target.name === 'answer3') {
			answers.answer3 = event.target.value;
		}

		this.setState({answers: answers});
		console.log(this.state.answers);
	}

	render () {

		var name = '';
		var questions = '';

		if(this.state.name === '' && this.state.isSubmitted === false) {
			name = 
				<div className="survey-wrapper first-wrapper">
					<div className="first">
						<img src={first} alt="food"/>
					</div>
					<div className="message-wrapper">
						<h1 className="first-h1">{'Welcome to food survey'}</h1>
						<h3>{'Pls. Let us your name:'}</h3>
						<form onSubmit={this.nameSubmit.bind(this)}>
							<input className="name" type="text" placeholder="Your name" ref={input => this.name = input} />
						</form>
					</div>
				</div>;
			questions = '';

		} else if (this.state.name !== '' && this.state.isSubmitted === false) {
			name = 
				<div className="second-h1-bg-wrapper">
					<svg id="second-h1-bg" viewBox="0 0 600 81.5">
						<path fill="#E4F5F9" d="M11.2,1c0,0,172.5,78,285.8,78.8S589.5,1,589.5,1H11.2z"/>
					</svg>
					<svg id="second-h1-bg-xl" viewBox="0 0 600 81.5">
						<path fill="#E4F5F9" d="M11.2,1c0,0,172.5,78,285.8,78.8S589.5,1,589.5,1H11.2z"/>
					</svg>
					<svg id="second-h1-bg-md" viewBox="0 0 457.8 81.5">
						<path fill="#E4F5F9" d="M0.8,1c0,0,136.1,78,225.5,78.8S457,1,457,1H0.8z"/>
					</svg>
					<svg id="second-h1-bg-sm" viewBox="0 0 382 81.5">
						<path fill="#E4F5F9" d="M0.8,1c0,0,113,78,187.2,78.8S379.7,1,379.7,1H0.8z"/>
					</svg>
					<svg id="second-h1-bg-xs" viewBox="0 0 382 106.5">
						<path fill="#E4F5F9" d="M0.8,1c0,0,113,102.7,187.2,103.8C262.3,105.9,379.7,1,379.7,1H0.8z"/>
					</svg>
					<h1 className="second-h1">Welcome, {this.state.name}</h1>
				</div>;
			questions = 
				<div className="second-wrapper">
					<h3>Here are some questions: </h3>
					<form className="form-grid" onSubmit={this.questionSubmit.bind(this)}>
						<div className="first-section">
							<p>How often do you cook dinner at home?</p>
							<label class="radio-wrapper">daily
							  	<input type="radio" checked="checked" name="answer1" value="never" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">1-2 times a week
							  	<input type="radio" name="answer1" value="1-2 times a week" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">3-4 times a week
							  	<input type="radio" name="answer1" value="3-4 times a week" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">never
							  	<input type="radio" name="answer1" value="daily" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
						</div>

						<div className="second-section">
							<p>How often do you order delivery/take-out?</p>
							<label class="radio-wrapper">never
							  	<input type="radio" name="answer2" value="never" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">1-2 times a week
							  	<input type="radio" name="answer2" value="1-2 times a week" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">3-4 times a week
							  	<input type="radio" name="answer2" value="3-4 times a week" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">daily
							  	<input type="radio" name="answer2" value="daily" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
						</div>

						<div className="third-section">
							<p>When you cook, do you use convenience products?</p>
							<label class="radio-wrapper">always
							  	<input type="radio" name="answer3" value="always" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">usually
							  	<input type="radio" name="answer3" value="usually" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">occasionally
							  	<input type="radio" name="answer3" value="occasionally" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">never
							  	<input type="radio" name="answer3" value="never" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
						</div>

						<div className="fourth-section">
							<p>What's your favorite type of food to cook?</p>
							<label class="radio-wrapper">Chicken
							  	<input type="radio" name="answer4" value="Chicken" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">Beef
							  	<input type="radio" name="answer4" value="Beef" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">Seafood
							  	<input type="radio" name="answer4" value="Seafood" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">Pork
							  	<input type="radio" name="answer4" value="Pork" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">Vegetarian
							  	<input type="radio" name="answer4" value="Vegetarian" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
						</div>

						<div className="fifth-section">
							<p>If you buy dinner instead of making it, why?</p>
							<label class="radio-wrapper">Not enough time after work to cook
							  	<input type="radio" name="answer5" value="Not enough time after work to cook" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">Not enough time after work to shop for ingredients
							  	<input type="radio" name="answer5" value="Not enough time after work to shop for ingredients" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">Not enough time after work to shop for ingredients
							  	<input type="radio" name="answer5" value="Not enough time after work to shop for ingredients" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">I'm not a great cook
							  	<input type="radio" name="answer5" value="I'm not a great cook" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
							<label class="radio-wrapper">It's too much effort
							  	<input type="radio" name="answer5" value="It's too much effort" onChange={this.answerSelected} />
							  	<span class="checkmark"></span>
							</label>
						</div>
						<div className="sixt-section">
							<button className="submit">SUBMIT </button>
						</div>
					</form>
				</div>
		} else if(this.state.isSubmitted === true && this.state.name !== '') {
			name = 
				<div className="container survey-wrapper third-wrapper">
					<div className="first">
						<img src={third} alt="food"/>
					</div>
					<div className="message-wrapper">
						<h1 className="third-h1">{'Thanks,'} {this.state.name}</h1>
					</div>
				</div>;
			questions = '';
		}

		return (
			<div>
				{name}

				{questions}
			</div>
		)
	}
}

export default Survey;