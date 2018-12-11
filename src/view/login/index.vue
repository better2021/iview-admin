<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="username">
              <Input v-model="form.username" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="authcode">
              <Input class="authcode" v-model="form.authcode" placeholder="请输入验证码">
              <div slot="prepend">
                <div class="authcodeBox">
                  <Spin fix v-if="loading.authcode"></Spin>
                  <div class="con" @click="getAuthCode">
                    <img v-if="authcode.image" :src="authcode.image" alt="">
                    <span v-else>点击获取验证码</span>
                  </div>
                </div>
              </div>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long :loading="loading.login">
                <span v-if="!loading.login">登录</span>
                <span v-else>登录中</span>
              </Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    let bg = window.localStorage.getItem('bg') || 1;
    let username = window.localStorage.getItem('u_p')
      ? window.localStorage.getItem('u_p').split('_')[0]
      : '';
    let password = window.localStorage.getItem('u_p')
      ? window.localStorage.getItem('u_p').split('_')[1]
      : '';
    return {
      form: {
        username: username,
        password: password,
        authcode: ''
      },
      rules: {
        username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        authcode: [{ required: true, message: '验证码不能为空' }]
      },
      loading: {
        login: false,
        authcode: false
      },
      // 验证码
      authcode: {
        image: '',
        token: ''
      }
    };
  },
  created() {
    this.getAuthCode();
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login();
        }
      });
    },
    //获取图像验证码
    async getAuthCode() {
      this.authcode = {
        image: '',
        token: ''
      };
      this.loading.authcode = true;
      let res = await this.Fetch('/admin/login/imagecode', {
        method: 'GET'
      });
      this.loading.authcode = false;
      if (res.status !== 200) {
        this.$Message.error(res.message);
      } else {
        this.authcode = {
          image: res.data.images,
          token: res.data.token
        };
      }
    },
    async login() {
      this.loading.login = true;
      let { username, password, authcode } = this.form;
      let req = {
        username,
        password,
        code: authcode,
        token: this.authcode.token
      };
      let res = await this.Fetch(`/admin/login`, {
        method: 'POST',
        body: req
      });
      this.loading.login = false;
      if (res.status !== 200) {
        this.$Message.error(res.message);
        this.getAuthCode();
      } else {
        window.localStorage.setItem('token', `Bearer${res.data.token.trim()}`);
        window.localStorage.setItem('userInfo', JSON.stringify(res.data.list));
        window.localStorage.setItem('auth', res.data.route2);

        // 保存账号密码到localStorage
        window.localStorage.setItem('u_p', `${username}_${password}`);
        this.$store.commit('user/info', res.data.list);
        this.$Notice.open({
          title: res.data.list.username,
          desc: '欢迎回来',
          duration: 2
        });
        this.$router.push('/');
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import './index.less';
</style>
