<template>
  <div class="bg-red-300 d-flex flex-column justify-content-center align-items-center loginApp w-25 m-auto">
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">帳號</span>
      <input type="text" class="form-control" v-model="account" aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default" />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">密碼</span>
      <input type="text" class="form-control" v-model="password" aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default" />
    </div>
    <button type="button" class="btn btn-primary" @click="login">登入</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: null,
      password: null,
    };
  },
  methods: {
    login() {
      this.$emit('login', this.account, this.password);
    },
  },
};
</script>

<style lang="scss" scoped>
.loginApp {
  height: 100vh;
}
</style>
