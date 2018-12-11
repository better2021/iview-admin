<template>
  <div id="columns">
    <Modal v-model="columVisible" :width="600" :styles="{top: '40px'}" :transfer="false" title="编辑标签" :closable='false'>
      <div class="tabsList">
        <Tag closable @on-close="handleClose(index)" v-for="(item,index) in tabsList" :key='index' fade>{{item.name}}</Tag>
      </div>
      <div class="colum-info">
        <ul class="columns-items">
          <li class="item" v-for="(item,index) in columsList" :key='index' :class="{'active':active == item.name}" @click="_active(item)">{{item.name}}</li>
        </ul>
        <div class="colums-right">
          <div class="colums-tabs">
            <Tag v-for="(item,index) in columsListTabs.list" :key="index" @click.native="addTabs(item)">{{item.name}}</Tag>
          </div>
          <div class="tabs-add" v-if="tabsAdd">
            <Input v-model="tabsName" placeholder="请输入标签名称" />
            <Button>添加</Button>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="confirm">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    tabsAdd: {
      type: Boolean,
      default: true
    },
    columsList: {
      type: Array,
      default: () => {
        return [
          {
            name: '主演',
            id: '1',
            list: [
              {
                name: '李连杰',
                pid: '1',
                id: '12'
              },
              {
                name: '成龙',
                pid: '1',
                id: '13'
              },
              {
                name: '水水水水',
                pid: '1',
                id: '14'
              },
              {
                name: '李连杰',
                pid: '1',
                id: '15'
              },
              {
                name: '成龙',
                pid: '1',
                id: '16'
              }
            ]
          },
          {
            name: '制片地区',
            id: '2',
            list: [
              {
                name: '韩国',
                pid: '2',
                id: '22'
              },
              {
                name: '阿联酋',
                pid: '2',
                id: '23'
              },
              {
                name: '美国',
                pid: '2',
                id: '24'
              },
              {
                name: '中国',
                pid: '2',
                id: '25'
              },
              {
                name: '日本',
                pid: '2',
                id: '26'
              }
            ]
          }
        ];
      }
    }
  },
  watch: {
    columsList: {
      init() {
        this.init();
      }
    }
  },
  created() {
    this.init();
  },
  data() {
    return {
      tabsList: [],
      columsListTabs: [],
      tabsName: '',
      active: '主演',
      columVisible: false
    };
  },
  methods: {
    init() {
      this.columsListTabs = this.columsList[0];
    },
    handleClose(index) {
      this.tabsList.splice(index, 1);
    },
    _active(value) {
      this.active = value.name;
      this.columsListTabs = value;
    },
    addTabs(value) {
      if (this.tabsList.indexOf(value) === -1) {
        this.tabsList.push(value);
      }
    },
    _columVisible() {
      this.columVisible = true;
    },
    cancel(value) {
      this.columVisible = false;
      this.$emit('cancel');
    },
    confirm(value) {
      this.columVisible = false;
      this.$emit('confirm');
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>

