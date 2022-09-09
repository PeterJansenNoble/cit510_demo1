<template>
 <v-card
    class="pa-12"
    color="gray"
    flat
  >
<v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="1000"
    
  > 
    <v-card-title class="caltitle">AXIOS DEMO</v-card-title>
    <v-btn block  color="primary"
  elevation="3"
  small
  x-large
  x-small @click="getQuestions">Get Post</v-btn>
    <v-list-item
            v-for="question in questions"
            :key="question.id"
        >
            <v-list-item-title class="questions">{{ question.question }}</v-list-item-title>
            Answer :
            <v-list-item color=#0c972a>
                {{question.correct_answer}}
            </v-list-item>
    </v-list-item>

    </v-card>
</v-card>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'

const questions=ref([])

async function getQuestions () {
    axios.get('https://opentdb.com/api.php?amount=25&category=18&difficulty=easy&type=multiple').then( response => {
        questions.value=(response.data.results)
    })
}
</script>

<style>
    .btn {
        align-items: center;
    }

    .questions {
        font-weight: bold;
    }


</style>