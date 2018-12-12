<template>
  <div class="header-bar">
    <SiderTrigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></SiderTrigger>
    <CustomBreadCrumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></CustomBreadCrumb>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import SiderTrigger from './SiderTrigger'
import CustomBreadCrumb from './CustomBreadCrumb'
import './index.less'
export default {
  name: 'HeaderBar',
  components: {
    SiderTrigger,
    CustomBreadCrumb
  },
  props: {
    collapsed: Boolean
  },
  computed: {
    breadCrumbList() {
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
    handleCollpasedChange(state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>
