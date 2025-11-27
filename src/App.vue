<template>
  <header class="!w-dvw !m-0 !p-0">
    <Menubar class="!bg-neutral-800 w-dvw" :model="items" >
      <template  #start>
        <span>
          <img src="@/assets/Western_white_side_Pawn.svg" width="50px" alt="My SVG Icon">
        </span>
        <router-link to="/match" class=" text-xl"><p class="text-yellow-500">OnlineChessMatchmaker</p></router-link>
      </template>
      <template #item = "{item, props}">
        <a class="flex items-center ml-6 p-4">
          <router-link v-if="item.route" :to="item.route">
            <span class="text-gray-400" :class="item.icon"/>
            <span class="ml-1 text-gray-400" >{{item.label}}</span>
          </router-link>
        </a>
      </template>
      <template #end>
        <div v-if="isAuthenticated && user">
          <a class="!text-yellow-500 !m-1">{{user.name}}</a>
          <Button class="!bg-yellow-500 !border-yellow-500 !m-1" @click="logout">Выход</Button>
        </div>
        <div class="flex" v-else>
          <form class="flex !items-center" @submit.prevent="login">
            <p v-if="authError" class="error"> {{authError}}</p>
            <router-link to="/user/create" class="!text-gray-400"><p><i class="pi pi-fw pi-pencil"></i>Регистрация</p></router-link>
            <InputText class="!m-1" placeholder="Логин" v-model="email" type="email" required/>
            <InputText class="!m-1" placeholder="Пароль" v-model="password" type="password" required/>
            <Button class="!bg-yellow-500 !border-yellow-500 !m-1" type="submit">Войти</Button>
          </form>
        </div>
      </template>
    </Menubar>
  </header>
  <router-view></router-view>
</template>
<script>
import {useAuthStore} from "@/stores/AuthStore.js";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
export default {
  components: {Button,Menubar, InputText},
  data(){
    return{
      email: '',
      password: '',
      authStore: useAuthStore(),
      items: [
        {
          label: 'Матчи',
          icon: 'pi pi-fw pi-folder',
          route: '/match',
        },
        {
          label: 'Пользователи',
          icon: 'pi pi-fw pi-user',
          route: '/user',
        },
      ]
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
