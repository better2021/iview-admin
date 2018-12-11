<template>
  <div id="Header">
    <div class="routeName">
      <span>{{$route.name}}</span>
      <slot></slot>
    </div>

    <div class="quickSel"></div>
    <ul class="quickHint">
      <li>
        <Dropdown @on-click="handleUser">
          <span>
            {{userInfo.username}}
            <Icon type="arrow-down-b"></Icon>
          </span>
          <DropdownMenu slot="list">
            <!-- <DropdownItem name="changePassword">修改密码</DropdownItem> -->
            <DropdownItem name="logout">退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </li>
    </ul>
    <!-- 修改密码 -->
    <Modal v-model="visible.password" title="修改密码" :transfer="false">
      <Spin fix v-if="loading.password"></Spin>
      <Form
        v-if="visible.password"
        :model="passwordForm"
        ref="passwordForm"
        :label-width="80"
        :rules="ruleValidate"
      >
        <FormItem label="旧密码" prop="old">
          <Input v-model="passwordForm.old"></Input>
        </FormItem>
        <FormItem label="新密码" prop="new">
          <Input v-model="passwordForm.new"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="newRe">
          <Input v-model="passwordForm.newRe"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="changePassword" :loading="loading.password">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { getValidRouteList } from '../../router/routes';
const initPassword = {
  old: '',
  new: '',
  newRe: ''
};
export default {
  data() {
    return {
      loading: {
        password: false
      },
      visible: {
        password: false
      },
      validRoutes: [],
      passwordForm: { ...initPassword }, // 修改密码
      ruleValidate: {
        old: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        new: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        newRe: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          {
            validator: (rule, value, cb) =>
              this.passwordForm.new == this.passwordForm.newRe ? cb() : cb('两次输入的密码不一致')
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {
    this.validRoutes = getValidRouteList();
  },
  methods: {
    // 用户快捷操作
    handleUser(i) {
      if (i == 'changePassword') {
        this.handleChangePassword();
      }
      if (i == 'logout') {
        this.logout();
      }
    },
    // 修改密码
    handleChangePassword() {
      this.passwordForm = Object.assign({}, initPassword);
      this.visible.password = true;
    },
    async changePassword() {
      this.$refs['passwordForm'].validate(async valid => {
        if (valid) {
          this.loading.password = true;
          let req = {
            'new-pw': this.passwordForm.new,
            'old-pw': this.passwordForm.old,
            user_name: this.userInfo.username
          };
          let res = await this.Fetch(`/admin/pw/${this.userInfo.id}`, {
            method: 'PATCH',
            body: req
          });
          this.loading.password = false;
          if (res.status != 200) {
            this.$Message.error(res.message);
          } else {
            this.$Message.success(res.message);
            this.visible.password = false;
          }
        }
      });
    },
    // 退出登录
    logout() {
      this.$Modal.confirm({
        title: '系统提示',
        content: '确认要退出吗?',
        onOk: () => {
          window.localStorage.removeItem('token');
          this.$router.push('/login');
        },
        onCancel: () => {}
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
