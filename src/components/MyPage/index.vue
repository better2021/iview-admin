<template>
  <div id="MyPage" style="margin-top:30px">
    <slot></slot>
    <Page
      :current="current"
      :page-size="currentPageSize"
      :total="total"
      :page-size-opts="pageSizeOpts"
      :show-sizer="showSizer"
      @on-change="onChange"
      @on-page-size-change="changePageSize"
      :ikey="ikey"
    ></Page>
  </div>
</template>
<script>
export default {
  name: 'MyPage',
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 20
    },
    pageSizeOpts: {
      type: Array,
      default() {
        return [20, 50, 100, 500];
      }
    },
    showTotal: {
      type: Boolean,
      default: false
    },
    showSizer: {
      type: Boolean,
      default: false
    },
    ikey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      id: 'myPage' + Date.now(),
      currentPageSize:
        Number(localStorage.getItem(`pageSize${this.$route.fullPath}${this.ikey}`)) || this.pageSize
    };
  },
  methods: {
    changePageSize(page) {
      // console.log('???');
      // console.log(page, 'change');
      localStorage.setItem(`pageSize${this.$route.fullPath}${this.ikey}`, page);
      this.$emit('changePageSize', page);
    },
    async onChange(page) {
      await this.$store.commit('film/currentPage', page);
      await this.$emit('onChange', page);
    }
  },
  watch: {},
  mounted() {
    if (this.showSizer) {
      let getPageSize = localStorage.getItem(`pageSize${this.$route.fullPath}`);
    } else {
      localStorage.removeItem(`pageSize${this.$route.fullPath}`);
    }
    let getPageSize = localStorage.getItem(`pageSize${this.$route.fullPath}${this.ikey}`);
    this.changePageSize(this.currentPageSize);
  }
};
</script>
