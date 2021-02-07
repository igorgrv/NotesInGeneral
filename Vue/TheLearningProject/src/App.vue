<template>
  <div>
    <the-header title="Main Page"></the-header>
    <the-resources></the-resources>
  </div>
</template>

<script>
import TheHeader from './layout/TheHeader';
import TheResources from './components/TheResources'

export default {
  name: 'App',
  components: { TheHeader, TheResources },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
</style>
