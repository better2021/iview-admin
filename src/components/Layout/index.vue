<template>
  <div id="Layout">
    <div class="sider" v-if="f!=0">
      <LeftMenu></LeftMenu>
    </div>
    <div class="main">
      <div class="header" v-if="f!=0">
        <Header></Header>
      </div>
      <div class="headerTab" v-if="f!=0">
        <headerTab></headerTab>
      </div>
      <div class="page" :class="f!=0?'pageTop':''">
        <router-view v-if="hasAuth" ref="view" class="page-con"></router-view>
        <NoAuth v-else class="page-con"></NoAuth>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '../Header';
import LeftMenu from '../LeftMenu';
import headerTab from '../headerTab';

import { hasAuth } from '../../router/routes';
import NoAuth from '../NoAuth';

export default {
  components: {
    Header,
    LeftMenu,
    NoAuth,
    headerTab
  },
  computed: {
    hasAuth() {
      if (this.f == 0) {
        return true;
      }
      return hasAuth(this.$route.name);
    }
  },
  created() {
    this.f = this.$route.query ? Number(this.$route.query.f) : Number(this.f);
  },
  data() {
    return {
      f: 1
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>

