<template>
  <div>
    <h1> Wa Chee</h1>
    <app-header></app-header>
    <router-view></router-view>
   
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components:{
    'app-header': Header,
  }
}




</script>

<style>
h1 {
  text-align: center;
  color:black;
  background-color: pink;
}
</style>
