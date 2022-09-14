
<template>
    <v-card
   :loading="loading"
   class="mx-auto my-12"
   max-width="750"
   max-height="750"
   elevation="9"
 >
 <v-card-title class="caltitle">Sign-In</v-card-title>
 <v-container fluid>
   
   <div id="quiz-container">
   <center><h1>Sign In your Account</h1></center>
   <p class="mx-auto my-1"></p>
   
   <v-text-field
                             
                              name="login"
                              v-model="email"
                              label="Login"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              
                              name="Password"
                              v-model="password"
                              label="Password"
                              type="password"
                           ></v-text-field>
   <p v-if="errMsg">{{errMsg}}</p>
<p class="mx-auto my-1">
   <v-btn block  color="#34495E"
 elevation="1"
 small
 x-large
 x-small
 @click="register"><div class="resultbtn">Sign-In</div></v-btn>
</p>
<v-divider></v-divider>
 <p>
 <v-btn block  color="#EA4335"
 elevation="1"
 small
 x-large
 x-small
 router-link to="/register"><div class="resultbtn">Register</div></v-btn>
</p>

   
   </div>
   
</v-container>
   </v-card>

</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router'

const email = ref("");
const password = ref("");
const errMsg = ref()
const router = useRouter()
const register = () => {
   signInWithEmailAndPassword(getAuth(), email.value, password.value)
   .then((data) => {
       console.log("Succesfully signed in!");
       router.push('/dashboard')
   })
   .catch((error) => { 
       console.log(error.code);
       switch (error.code) {
        case "auth/invalid-email":
            errMsg.value = "Invalid Email";
        break;
        case "auth/user-not-found":
            errMsg.value = "No account with that email was found";
        break;
        case "auth/wrong-password":
            errMsg.value = "Incorrect password";
        break;
        default:
            errMsg.value = "Email or password was incorrect";
        break;
       }
   })
};
const signInWithGoogle = () => {

}
</script>



<style>
.h1{
   align-content: center;
}
</style>