<template>
  <div class='App'>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {

    }
  },
}
</script>

<style>
.App {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

* {
  font-size: 14px;
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
