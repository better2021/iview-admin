<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="authcode">
      <Input class="authcode" v-model="form.authcode" placeholder="请输入验证码">
        <div slot="prepend">
          <div class="authcodeBox">
            <Spin fix v-if="loading.authcode"></Spin>
            <div class="con" @click="getAuthCode">
              <img v-if="authcode.image" :src="authcode.image" alt>
              <span v-else>点击获取验证码</span>
            </div>
          </div>
        </div>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      loading: {
        login: false,
        authcode: false
      },
      form: {
        userName: 'super_admin',
        password: ''
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
    // 获取验证码
    async getAuthCode() {
      this.loading.authcode = true
      let res = await this.$axios.request({
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
    // 登陆
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>
