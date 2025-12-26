import {defineStore} from "pinia";
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    errorMessage: "",
  }),
  actions: {
    async login(credentials){
      this.errorMessage = "";
      try {
        const response = await axios.post(backendUrl + '/login', credentials);
        this.token = response.data.token;
        this.user = response.data.user;
        this.isAuthenticated = true;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.user.id);
        console.log(this.user);
        console.log(localStorage.getItem('id'));
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async getUser(id) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl+ '/user/' + id,
          { headers: {
            Authorization: 'Bearer ' + this.token
            }});
        this.user = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      await axios.post(backendUrl + '/logout');
    },
  },
});
