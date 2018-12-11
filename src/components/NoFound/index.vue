<template>
  <div id="NoFound">
    <div class="card">
      <img src="../../assets/img/nofound.png" alt="">
      <div class="con">
        <p>抱歉，你访问的页面不存在</p>
        <p>您要找的页面没有找到，请返回
          <router-link to="/">首页</router-link>
          继续浏览</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
