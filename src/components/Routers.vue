<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
  </div>
</template>

<script>
export default {
  name: "Routers"
}
</script>

<style scoped>
  #nav a.router-link-exact-active {
  color: #42b983;
}
</style>