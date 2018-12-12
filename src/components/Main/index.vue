<template>
  <Layout style="height: 100%" class="main">
    <Sider
      v-model="collapsed"
      hide-trigger
      collapsible
      :width="256"
      :collapsed-width="64"
      class="left-sider"
      :style="{overflow: 'hidden'}"
    >
      <SideMenu
        ref="sideMenu"
        :menu-list="menuList"
        accordion
        :active-name="$route.name"
        :collapsed="collapsed"
        @on-select="turnToPage"
      >
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <img v-show="!collapsed" key="max-logo" :src="maxLogo">
          <img v-show="collapsed" key="min-logo" :src="minLogo">
        </div>
      </SideMenu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <HeaderBar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <User :user-info="userInfo"/>
          <Language
            v-if="$config.useI18n"
            style="margin-right: 10px;"
            :lang="local"
            @on-lang-change="setLocal"
          />
          <ErrorStore
            v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader"
            :has-read="hasReadErrorPage"
            :count="errorList.length"
          />
          <FullScreen v-model="isFullscreen" style="margin-right: 10px;"/>
        </HeaderBar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <TagsNav
              :value="$route"
              :list="tagNavList"
              @input="handleClick"
              @on-close="handleCloseTag"
            />
          </div>
          <Content class="content-wrapper">
            <KeepAlive :include="cacheList">
              <RouterView/>
            </KeepAlive>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from './components/SideMenu'
import HeaderBar from './components/HeaderBar'
import TagsNav from './components/TagsNav'
import User from './components/User'
import FullScreen from './components/FullScreen'
import Language from './components/Language'
import ErrorStore from './components/ErrorStore'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getNewTagList, getNextRoute, routeEqual } from '@/libs/util'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'
import './index.less'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    Language,
    TagsNav,
    FullScreen,
    ErrorStore,
    User
  },
  data() {
    return {
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false
    }
  },
  computed: {
    ...mapGetters(['errorList']),
    tagNavList() {
      return this.$store.state.app.tagNavList
    },
    tagRouter() {
      return this.$store.state.app.tagRouter
    },
    userInfo() {
      return this.$store.state.user.userInfo
    },
    cacheList() {
      return this.tagNavList.length
        ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name)
        : []
    },
    menuList() {
      return this.$store.getters.menuList
    },
    local() {
      return this.$store.state.app.local
    },
    hasReadErrorPage() {
      return this.$store.state.app.hasReadErrorPage
    }
  },
  watch: {
    $route(newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted() {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.addTag({
      route: this.$store.state.app.homeRoute
    })
    this.setBreadCrumb(this.$route)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
  },
  methods: {
    ...mapMutations({
      setBreadCrumb: 'app/setBreadCrumb',
      setTagNavList: 'app/setTagNavList',
      addTag: 'app/addTag',
      setLocal: 'app/setLocal'
    }),
    ...mapActions({
      handleLogin: 'user/handleLogin'
    }),
    turnToPage(route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange(state) {
      this.collapsed = state
    },
    handleCloseTag(res, type, route) {
      if (type === 'all') {
        this.turnToPage(this.$config.homeName)
      } else if (routeEqual(this.$route, route)) {
        if (type !== 'others') {
          const nextRoute = getNextRoute(this.tagNavList, route)
          this.$router.push(nextRoute)
        }
      }
      this.setTagNavList(res)
    },
    handleClick(item) {
      this.turnToPage(item)
    }
  }
}
</script>
