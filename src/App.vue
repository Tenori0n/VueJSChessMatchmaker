<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <router-link to="/match" class="navbar-brand text-warning">OnlineChessMatchmaker</router-link>
      <ul class="navbar-nav me-auto mb-2 mb-md-0  ">
        <li class="nav-item"><router-link to="/match" class="nav-link">Матчи</router-link></li>
        <li class="nav-item"><router-link to="/user" class="nav-link">Пользователи</router-link></li>
      </ul>
      <li class="navbar-nav me-2 mb-2 mb-md-0" v-if="!user"><router-link to="/user/create" class="nav-link">Регистрация</router-link></li>
      <div v-if="isAuthenticated && user">
        <a class="nav-link active d-inline-flex align-items-center">{{user.name}}</a>
        <button class="btn btn-outline-warning" @click="logout">Выход</button>
      </div>
      <div v-else>
        <form class="d-flex" @submit.prevent="login">
            <input class="form-control me-2" placeholder="Логин" v-model="email" type="email" id="email" required/>
            <input class="form-control me-2" placeholder="Пароль" v-model="password" type="password" id="password" required/>
          <button class="btn btn-warning" type="submit">Войти</button>
          <p v-if="authError" class="error"> {{authError}}</p>
        </form>
      </div>
    </nav>
  </header>
  <router-view></router-view>
</template>
<script>
import {useAuthStore} from "@/stores/AuthStore.js";
export default {
  data(){
    return{
      email: '',
      password: '',
      authStore: useAuthStore(),
    };
  },
  computed:{
    isAuthenticated(){
      return this.authStore.isAuthenticated;
    },
    user(){
      return this.authStore.user;
    },
    authError(){
      return this.authStore.errorMessage;
    },
  },
  methods: {
    logout() {
      this.authStore.logout();
    },
    login() {
      this.authStore.login({email: this.email, password: this.password});
    },
  },
  mounted() {
      const token = localStorage.getItem("token");
      if (token) {
        this.authStore.isAuthenticated = true;
        this.authStore.getUser();
      }
  },
};
</script>
<style>
.error {
  color: red;
}
</style>
