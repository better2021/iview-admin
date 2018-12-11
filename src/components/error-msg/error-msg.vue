<template>
  <div id="Msg" v-if="errorList.length"></div>
</template>

<script>
export default {
  name: 'Msg',
  computed: {
    errorList() {
      const errorList = this.$store.state.app.errorList
      console.log('errorList-->', errorList)
      if (errorList.length) {
        const error = errorList[0]
        this.$Message.error(error.message)
        this.$store.commit('app/removeError')
      }
      return errorList
    }
  }
}
</script>

