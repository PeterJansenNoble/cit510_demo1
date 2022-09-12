<template>
	 <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="1000"
    max-height="750"
    elevation="9"
  >
  <v-card-title class="caltitle">QUIZ APP</v-card-title>
	<div id="quiz-container">
		<h1 class="titlequiz">Quiz about Sports</h1>
	   <h5>Score: {{score}}/{{questions.length}}</h5>
	   <!-- div#correctAnswers -->
	   <hr class="divider" />
	   <h3>Question: {{currentnumberQuestion}} / {{questions.length}}</h3>
	   <div>
		 <h1 v-html="loading ? 'Loading...' : currentQuestion.question"></h1>
		 <form v-if="currentQuestion">
		   <button
			 v-for="answer in currentQuestion.answers"
			 :index="currentQuestion.key"
			 :key="answer"
			 v-html="answer"
			 @click.prevent="handleButtonClick"
		   ></button>
		 </form>
		 <hr class="divider" />
	   </div>
	 </div>
	 </v-card>
	 
   </template>
	 
	 <script>
   export default {
	 name: "Quiz",
	 // data() function stores state variables
	 data() {
	   return {
		 questions: [],
		 loading: true,
		 index: 0,
		 score: 0,
		 currentnumberQuestion:1
	   };
	 },
	 computed: {
	   currentQuestion() {
		 if (this.questions !== []) {
		   return this.questions[this.index];
		 }
		 return null;
	   },
	 },
	 // Custom methods of the Vue Component
	 methods: {
	   async fetchQuestions() {
		 this.loading = true;
		 let response = await fetch(
		   "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
		 );
		 let jsonResponse = await response.json();
		 let index = 0; // index is used to identify single answer
		 let data = jsonResponse.results.map((question) => {
		   // put answers on question into single array
		   question.answers = [
			 question.correct_answer,
			 ...question.incorrect_answers,
		   ];
		   // Shuffle question.answers array
		   for (let i = question.answers.length - 1; i > 0; i--) {
			 const j = Math.floor(Math.random() * (i + 1));
			 [question.answers[i], question.answers[j]] = [
			   question.answers[j],
			   question.answers[i],
			 ];
		   }
		   // add rightAnswer and key property to each question
		   question.rightAnswer = null;
		   question.key = index;
		   index++;
		   return question;
		 });
		 this.questions = data;
		 this.loading = false;
	   },
	   handleButtonClick: function (event) {
		 /* Find index to identiy question object in data */
		 let index = event.target.getAttribute("index");
   
		 let pollutedUserAnswer = event.target.innerHTML; // innerHTML is polluted with decoded HTML entities e.g ' from &#039;
		 /* Clear from pollution with ' */
		 let userAnswer = pollutedUserAnswer.replace(/'/, "&#039;");
   
		 /* Set userAnswer on question object in data */
		 this.questions[index].userAnswer = userAnswer;
   
		 /* Set class "clicked" on button with userAnswer -> for CSS Styles; Disable other sibling buttons */
		 event.target.classList.add("clicked");
		 let allButtons = document.querySelectorAll(`[index="${index}"]`);
   
		 for (let i = 0; i < allButtons.length; i++) {
		   if (allButtons[i] === event.target) continue;
   
		   allButtons[i].setAttribute("disabled", "");
		 }
   
		 /* Invoke checkAnswer to check Answer */
		 this.checkAnswer(event, index);
	   },
	   checkAnswer: function (event, index) {
		 let question = this.questions[index];
   
		 if (question.userAnswer) {
		   if (this.index < this.questions.length - 1) {
			 setTimeout(
			   function () {
				 this.index += 1;
				 this.currentnumberQuestion+=1;
			   }.bind(this),
			   1000
			 );
		   }
		   if (question.userAnswer === question.correct_answer) {
			 /* Set class on Button if user answered right, to celebrate right answer with animation joyfulButton */
			 event.target.classList.add("rightAnswer");
			 /* Set rightAnswer on question to true, computed property can track a streak out of 10 questions */
			 this.questions[index].rightAnswer = true;
			 this.score++;
		   } else {
			 /* Mark users answer as wrong answer */
			 event.target.classList.add("wrongAnswer");
			 this.questions[index].rightAnswer = false;
			 /* Show right Answer */
			 let correctAnswer = this.questions[index].correct_answer;
			 let allButtons = document.querySelectorAll(`[index="${index}"]`);
			 allButtons.forEach(function (button) {
			   if (button.innerHTML === correctAnswer) {
				 button.classList.add("showRightAnswer");
			   }
			 });
		   }
		 }
	   },
	 },
	 // Code inside mounted() runs after the Component has mounted
	 mounted() {
	   this.fetchQuestions();
	 },
   };
   </script>
	 
	 <style scoped>
   #quiz-container {
	 margin: 1rem auto;
	 padding: 1rem;
	 max-width: 750px;
   }
   
   
  
.content-footer,
.masthead-heading,
.masthead-intro {
  text-align: center;
}
.titlequiz {
	align-content: center;
}
.masthead {
  padding: 6em 0;
  
  background-size: cover;
  background-repeat: no-repeat;
  border-top: solid 1em #FFCF33;
}

.masthead-intro {
    /* Layout Declarations */
    margin-bottom: 0.1em;
    /* Typography Declarations */
    font-family: "Gentium Book Basic", Georgia, serif;
    font-size: 2em;
}

.masthead-heading {
    /* Layout Declarations */
    color: #F1C863;
    margin-top: -0.2em;
    /* Typography Declarations */
    font-family: "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: bold;
    font-size: 6em;
    letter-spacing: -0.02em;
    text-transform: uppercase;
}
   
   h1 {
	 font-size: 1.3rem;
	 padding: 0.7rem;
   }
   
   .divider {
	 margin: 0.5rem 0;
	 border-radius: 2px;
	 box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.3);
   }
   
   form {
	 display: flex;
	 flex-direction: row;
	 flex-wrap: wrap;
	 justify-content: center;
   }
   
   button {
	 font-size: 1.1rem;
	 box-sizing: border-box;
	 padding: 1rem;
	 margin: 0.3rem;
	 width: 47%;
	 background-color: rgba(100, 100, 100, 0.3);
	 border: none;
	 border-radius: 0.4rem;
	 box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.2);
   }
   
   button:hover:enabled {
	 transform: scale(1.02);
	 box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12),
	   0 3px 1px -1px rgba(0, 0, 0, 0.2);
   }
   
   button:focus {
	 outline: none;
   }
   
   button:active:enabled {
	 transform: scale(1.05);
   }
   
   @keyframes flashButton {
	 0% {
	   opacity: 1;
	   transform: scale(1.01);
	 }
	 50% {
	   opacity: 0.7;
	   transform: scale(1.02);
	 }
	 100% {
	   opacity: 1;
	   transform: scale(1);
	 }
   }
   
   button.clicked {
	 pointer-events: none;
   }
   
   button.rightAnswer {
	 animation: flashButton;
	 animation-duration: 700ms;
	 animation-delay: 200ms;
	 animation-iteration-count: 3;
	 animation-timing-function: ease-in-out;
	 color: black;
	 background: linear-gradient(
	   210deg,
	   rgba(0, 178, 72, 0.25),
	   rgba(0, 178, 72, 0.5)
	 );
   }
   
   button.wrongAnswer {
	 color: black;
	 background: linear-gradient(
	   210deg,
	   rgba(245, 0, 87, 0.25),
	   rgba(245, 0, 87, 0.5)
	 );
   }
   
   button.showRightAnswer {
	 animation: flashButton;
	 animation-duration: 700ms;
	 animation-delay: 200ms;
	 animation-iteration-count: 2;
	 animation-timing-function: ease-in-out;
	 color: black;
	 background: linear-gradient(
	   210deg,
	   rgba(0, 178, 72, 0.25),
	   rgba(0, 178, 72, 0.5)
	 );
   }
   </style>