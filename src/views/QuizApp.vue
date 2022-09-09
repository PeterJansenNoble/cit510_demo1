<script setup>
import { ref, computed } from 'vue'

const questions = ref([
{
	question: 'What does CPU stand for?',
	answer: 1,
	options: [
		
		'computer processing unit',
        'central processing unit',
		'core processing unit'
	],
	selected: null
  },
  {
	question: 'When Gmail first launched, how much storage did it provide for your email?',
	answer: 0,
	options: [
		'1GB',
		'2GB',
        '3GB',
	],
	selected: null
  },
  {
	question: 'Who is often called the father of the computer?',
	answer: 2,
	options: [
		'Charles Darwin',
		'Charles Alexander',
        'Charles Babbage',
        
	],
	selected: null
  },
  {
	question: 'What’s the shortcut for the “copy” function on most computers?',
	answer: 2,
	options: [
		'Ctrl + Z',
		'Ctrl + X',
        'Ctrl + C',
	],
	selected: null
  },
  {
	question: 'Google Chrome, Safari, Firefox, and Explorer are different types of what?',
	answer: 0,
	options: [
		'Browser',
		'Emails',
        'Accounts',
	],
	selected: null
  },
  {
	question: 'What year was the very first model of the iPhone released?',
	answer: 0,
	options: [
		'2007',
		'2008',
        '2009',
	],
	selected: null
  },
  {
	question: 'What is often seen as the smallest unit of memory?',
	answer: 2,
	options: [
		'megabyte',
		'microbyte',
        'kilobyte',
	],
	selected: null
  },
  {
	question: 'What is Vue?',
	answer: 0,
	options: [
		'A framework',
		'A library',
		'A type of hat'
	],
	selected: null
  },
  {
	question: 'What is Vuex used for?',
	answer: 2,
	options: [
		'Eating a delicious snack',
		'Viewing things',
		'State management'
	],
	selected: null
  },
  {
	question: 'What is Vue Router?',
	answer: 1,
	options: [
		'An ice cream maker',
		'A routing library for Vue',
		'Burger sauce'
	],
	selected: null
  }

])

const quizCompleted = ref(false)
const currentQuestion = ref(0)
const score = computed(() => {
	let value = 0
	questions.value.map(q => {
		if (q.selected != null && q.answer == q.selected) {
			console.log('correct');
			value++
		}
	})
	return value
})

const getCurrentQuestion = computed(() => {
	let question = questions.value[currentQuestion.value]
	question.index = currentQuestion.value
	return question
})

const SetAnswer = (e) => {
	questions.value[currentQuestion.value].selected = e.target.value
	e.target.value = null
}

const NextQuestion = () => {
	if (currentQuestion.value < questions.value.length - 1) {
		currentQuestion.value++
		return
	}
	
	quizCompleted.value = true
}
</script>

<template>
    <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="1000"
    max-height="550"
  >
  <v-card-title class="caltitle">QUIZ APP</v-card-title>
	<main class="app">
	
		<h1>Technology & Science Trivia Questions</h1>
		<section class="quiz" v-if="!quizCompleted">
			<div class="quiz-info">
				<span class="question">{{ getCurrentQuestion.question }}</span>
				<span class="score">Score {{ score }}/{{ questions.length }}</span>
			</div>
			
			<div class="options">
				<label 
					v-for="(option, index) in getCurrentQuestion.options" 
					:for="'option' + index" 
					:class="`option ${
						getCurrentQuestion.selected == index 
							? index == getCurrentQuestion.answer 
								? 'correct' 
								: 'wrong'
							: ''
					} ${
						getCurrentQuestion.selected != null &&
						index != getCurrentQuestion.selected
							? 'disabled'
							: ''
					}`">
					<input 
						type="radio" 
						:id="'option' + index" 
						:name="getCurrentQuestion.index" 
						:value="index" 
						v-model="getCurrentQuestion.selected" 
						:disabled="getCurrentQuestion.selected"
						@change="SetAnswer" 
					/>
					<span>{{ option }}</span>
				</label>
			</div>
			
			<v-btn block 
 			 	elevation="9"
  				small
 				x-large
  				x-small
				@click="NextQuestion" 
				:disabled="!getCurrentQuestion.selected">
				{{ 
					getCurrentQuestion.index == questions.length - 1 
						? 'Finish' 
						: getCurrentQuestion.selected == null
							? 'Select an option'
							: 'Next question'
				}}
			</v-btn>
		</section>

		<section v-else>
			<h2>You have finished the quiz!</h2>
			<p>Your score is {{ score }}/{{ questions.length }}</p>
		</section>
	</main>
</v-card>
</template>

<style>
* {
	
	box-sizing: border-box;
	font-family: 'Montserrat', sans-serif;
    
}

body {
	background-color: #fcfaff;
	color: #FFF;
}

.app {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem;
	height: 100vh;
}

h1 {
	font-size: 2rem;
	margin-bottom: 2rem;
    
   
}

.quiz {
	background-color: #ffffff;
	padding: 1rem;
	width: 100%;
	max-width: 640px;
}

.quiz-info {
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
}

.quiz-info .question {
	color: #000000;
	font-size: 1.25rem;
}

.quiz-info.score {
	color: #FFF;
	font-size: 1.25rem;
}

.options {
	margin-bottom: 1rem;
}

.option {
	padding: 1rem;
	display: block;
	background-color: #b9b9b9;
	margin-bottom: 0.5rem;
	border-radius: 0.5rem;
	cursor: pointer;
    ;
}

.option:hover {
	background-color: #cccccc;
}

.option.correct {
	background-color: #2cce7d;
}

.option.wrong {
	background-color: #ff5a5f;
}

.option:last-of-type {
	margin-bottom: 0;
}

.option.disabled {
	opacity: 0.5;
}

.option input {
	display: none;
}

button {
	appearance: none;
	outline: none;
	border: none;
	cursor: pointer;
	padding: 0.5rem 1rem;
	background-color: #00f57a;
	color: #ffffff;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 1.2rem;
	border-radius: 10%;
}

button:disabled {
	opacity: 0.5;
}

h2 {
	font-size: 2rem;
	margin-bottom: 2rem;
	text-align: center;
}

p {
	color: #8F8F8F;
	font-size: 1.5rem;
	text-align: center;
}
.caltitle {
  text-align: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-top: solid 1em #1d2920;
}
</style>
