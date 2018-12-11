<template>
  <div id="app">
    <ErrorMsg/>
    <router-view/>
  </div>
</template>

<script>
import ErrorMsg from '_c/error-msg'
export default {
  name: 'App',
  components: {
    ErrorMsg
  }
}
</script>

<style lang="less">
.size {
  width: 100%;
  height: 100%;
}
html,
body {
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
