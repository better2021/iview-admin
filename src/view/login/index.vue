<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
            <FormItem prop="username">
              <Input v-model="form.username" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="ios-person"/>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input v-model="form.password" type="password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="md-lock"/>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="authcode">
              <Input v-model="form.authcode" class="authcode" placeholder="请输入验证码">
                <div slot="prepend">
                  <div class="authcodeBox">
                    <Spin v-if="loading.authcode" fix/>
                    <div class="con" @click="getAuthCode">
                      <img v-if="authcode.image" :src="authcode.image" alt>
                      <span v-else>点击获取验证码</span>
                    </div>
                  </div>
                </div>
              </Input>
            </FormItem>
            <FormItem class="login-box">
              <Button
                type="primary"
                long
                clo
                :loading="loading.login"
                @click="handleSubmit"
              >
              {{ loading.login ? '登录中' : '登录' }}
              </Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    // 缓存的账户信息
    const [username, password] = window.localStorage.getItem('u_p')
      ? window.localStorage.getItem('u_p').split('_')
      : ['', '']
    return {
      loading: {
        login: false,
        authcode: false
      },
      form: {
        username,
        password,
        authcode: ''
      },
      authcode: {
        image: '',
        token: ''
      },
      rules: {
        username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        authcode: [{ required: true, message: '验证码不能为空' }]
      }
    }
  },
  created() {
    this.getAuthCode()
  },
  methods: {
    ...mapActions({
      handleLogin: 'user/handleLogin'
    }),
    // 获取验证码
    async getAuthCode() {
      this.loading.authcode = true
      const res = await this.$axios.request({
        url: '/admin/login/imagecode',
        method: 'GET'
      })
      this.loading.authcode = false
      if (res.status === 200) {
        this.authcode = {
          image: res.data.images,
          token: res.data.token
        }
      } else {
        this.$Message.error(res.message)
      }
    },
    // 登录
    handleSubmit() {
      // this.$refs.loginForm.validate(async valid => {
      //   if (valid) {
      //     this.loading.login = true
      //     await this.handleLogin({
      //       form: this.form,
      //       token: this.authcode.token
      //     })
      //     this.loading.login = false
      //     this.$router.push({
      //       name: this.$config.homeName
      //     })
      //   }
      // })
      this.$router.push({
        name: this.$config.homeName
      })
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
