<template>
  <div id="LeftMenu">
    <ul class="menu">
      <!-- 首页 -->
      <li class="first-item" :class="{'active':$route.path =='/'}" @click="goTo('/')">
        <i class="iconfont icon-caidanguanli"></i>
        <span>总览</span>
      </li>
      <li
        class="first-item"
        v-for="(it,i) in validRouteTree"
        :key="i"
        :class="{'active':i==curentMenu.pid}"
      >
        <i :class="it.icon"></i>
        <span>{{it.name}}</span>
        <ul class="second-menu">
          <li
            class="second-item"
            v-for="(is,j) in it.children"
            :key="j"
            @click="goTo(`${is.path}`)"
            :class="{'active':is.id == curentMenu.id}"
          >
            <span>{{is.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { getValidRouteTree, getRouteId } from '../../router/routes';

export default {
  data() {
    return {
      validRouteTree: []
    };
  },
  created() {
    this.validRouteTree = getValidRouteTree();
  },
  computed: {
    curentMenu() {
      return getRouteId(this.$route.name);
    },
    ...mapState({
      latelyRoutes: state => state.user.latelyRoutes
    })
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    pushLately(route) {
      this.latelyRoutes.map((x, i) => {
        if (x.name === route.name) {
          this.latelyRoutes.splice(i, 1);
        }
      });
      this.latelyRoutes.unshift(route);
      this.$store.commit('user/latelyRoutes', this.latelyRoutes);
    }
  },
  watch: {
    $route: {
      handler() {
        this.pushLately(this.$route);
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
