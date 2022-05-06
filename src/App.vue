<template>
  <div id="app">
    <todo-app v-if="isLogin === true" @backToLogin="backToLogin"></todo-app>
    <login-app @login="login" v-else></login-app>
  </div>
</template>

<script>
import axios from 'axios';
import TodoApp from './components/TodoApp.vue';
import LoginApp from './components/LoginApp.vue';

export default {
  components: { LoginApp, TodoApp },
  name: 'App',
  data() {
    return {
      isLogin: false,
    };
  },
  mounted() {
    this.isLogin = this.getLogin()
  },
  methods: {
    // async login() {
    //   const res = await axios.post('http://192.168.88.108:3000/login', { account:, password:});
    //   this.todos = res.data.todos;
    // },
    async getLogin() {
      axios.defaults.baseURL = '/api';

      const res = await axios.get('/login');
      this.isLogin = res.data.isLogin
    },
    async login(account, password) {
      axios.defaults.baseURL = '/api';

      const res = await axios.post('/login', {
        account,
        password,
      });
      this.isLogin = res.data.isLogin;
      if (!this.isLogin) alert('帳號密碼錯誤');
    },
    backToLogin() {
      this.isLogin = false
    }
  },
};
</script>
