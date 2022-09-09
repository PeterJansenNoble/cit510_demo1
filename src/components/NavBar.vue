<template>

  <nav class="nav-menu">
    
    
      <v-toolbar color="teal" class="toolbar" app>
       <v-app-bar-nav-icon @click='toggleDrawer' class="toggledrawer"></v-app-bar-nav-icon>
      <v-toolbar-title >
        <h1 class="noble-title">Midterm Laboratory</h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
    <v-menu
      open-on-hover>
      
      <template v-slot:activator="{ props }">
        
        
        <v-avatar  color="black">
      <span class="white--text text-h5">PJ</span>
    </v-avatar>
    <v-avatar>
      
    </v-avatar>
     

        
        
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          router
          :to="item.path" :prepend-icon="item.icon">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

     
      
      
      </v-toolbar>
      
     <v-navigation-drawer color="Mint" v-model="drawer" >
     <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
      <center>
		<div center class="logo">
			<img :src="logoURL" alt="Vue" /> 
		</div>
  </center>
       <v-list-item
          v-for="item in items"
          :key="item.title"
          router 
          :to="item.path" :prepend-icon="item.icon" class="items">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          
        </v-list-item>
        
      </aside>
     </v-navigation-drawer>
      
  </nav>
 
</template>

<script setup>
  import { ref } from 'vue'
  import logoURL from '../assets/logo.png'
    
  const drawer = ref(false)
  
  const items =  ref([
           { title: 'Dashboard', icon: 'mdi-view-dashboard', path: '/Dashboard' },
           { title: 'Basic Math', icon: 'mdi-calculator', path: '/basicMath' },
           { title: 'String App', icon: 'mdi-code-string', path: '/stringApp'},
           { title: 'Quiz App', icon: 'mdi-help', path: '/QuizApp'},
           { title: 'About Vuetify', icon: 'mdi-receipt', path: '/Vuetify'},
          { title: 'About Me', icon: 'mdi-face', path: '/About'},
          { title: 'About Apps', icon: 'mdi-apps', path: '/AboutApps'},
          
          
         
        ])
        

 function toggleDrawer(){
  return drawer.value = !drawer.value
 }

 
</script>

<style>
aside {
  display: flex;
	flex-direction: column;
	background-color: var(--dark);
	
  
	transition: 0.2s ease-in-out;

    
}

.nav-menu {
  margin: 0 -1rem;
}

.toolbar {
  padding-left: 1rem;
}
.noble-title {
  color: white;
  padding-top: 35px;
}
.toggle-drawer {
  color: white;
}






</style>