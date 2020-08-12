<template>
  <div id="app">
    <!-- <MZDialog msg="Welcome to Your Vue.js App"/> -->
    <Test />
  </div>
</template>

<script>
import Test from './components/test'
export default {
  name: 'App',
  components: {
    Test
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center; 
  /* text-align: justify; */
  color: #2c3e50;
  margin:0;
  padding:0;
}
</style>
