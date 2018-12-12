<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar :src="userInfo.avatar || avatar"/>
      <span class="user-name">{{ userInfo.username }}</span>
      <Icon :size="18" type="md-arrow-dropdown"/>
      <DropdownMenu slot="list">
        <DropdownItem name="changepw">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import './index.less'
import avatar from '@/assets/images/avatar.jpg'
export default {
  name: 'User',
  props: {
    userInfo: {
      type: Object,
      default() {
        return {
          avater: '',
          username: ''
        }
      }
    }
  },
  data() {
    return {
      avatar
    }
  },
  methods: {
    ...mapActions({
      handleLogOut: 'user/handleLogOut'
    }),
    handleClick(name) {
      switch (name) {
        case 'logout':
          this.handleLogOut('')
          this.$router.push({ name: 'login' })
          break
        case 'changepw':
          console.log('修改密码')
          break
      }
    }
  }
}
</script>
