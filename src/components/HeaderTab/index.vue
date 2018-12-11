<template>
  <div id="HearderTab">
    <Tabs
      type="card"
      @on-tab-remove="handleTabRemove"
      @on-click="handleTabClick"
      :value="curentMenu"
      :closable="latelyRoutes.length>1"
    >
      <TabPane
        v-for="(item,index) in latelyRoutes"
        :label="item.name"
        :key="item.path"
        :name="item.path"
      ></TabPane>
    </Tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      show: true
    };
  },
  computed: {
    ...mapState({
      latelyRoutes: state => state.user.latelyRoutes
    }),
    curentMenu() {
      return this.$route.path;
    }
  },
  created() {},
  destroyed() {},
  methods: {
    handleTabClick(value) {
      this.$router.push(value);
    },
    handleTabRemove(value) {
      this.latelyRoutes.splice(this.arrIndex(this.latelyRoutes, value), 1);
      this.$store.commit('user/latelyRoutes', this.latelyRoutes);
    },
    arrIndex(arr, value) {
      let i;
      arr.map((v, index) => {
        if (v.path === value) {
          i = index;
        }
      });
      return i;
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>