<script setup>

</script>

<template>
  <div class="!flex !justify-center">
    <form v-on:submit.prevent="updateUser(); this.$router.push(`/user/${this.authStore.user.id}`)" class="!w-1/2 !p-6">
      <h2 class="!text-center !text-4xl !font-bold !mb-3 !mx-1 !mx-md-4 !mt-4 !text-white" style="color: dimgrey">Настройки профиля {{this.authStore.user.name}}</h2>
      <div class="!flex !flex-col !mb-4 !mt-4">
        <InputText type="text" placeholder="Имя пользователя" v-model="this.userName"/>
      </div>
      <div class="!mb-4 !mt-4">
        <label for="file" id="file-label" class="!block !text-md !font-medium !text-gray-300 !border !border-gray-300 !rounded-md !p-2">
          <span class="pi pi-upload !mx-3"></span>Выбрать аватар</label>
        <input type="file" hidden id="file" name="file" v-on:change="changeCaption" required accept="image/*">
      </div>
      <div class="flex flex-col !mt-6">
        <Button class="!bg-yellow-500 !border-yellow-500" type="submit" label="Изменить"></Button>
      </div>
    </form>
  </div>
  <Toast position="bottom-right" />
</template>
<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import {useAuthStore} from "@/stores/AuthStore.js";
import {useDataStore} from "@/stores/DataStore.js";
import Toast from "primevue/toast";

export default {
  name: "UserProfileEdit",
  components: {InputText, Button, Toast},
  data() {
    return {
      authStore: useAuthStore(),
      dataStore: useDataStore(),
      userName: null,
      userAvatar: null,
    }
  },
  computed: {
    errorMessage(){
      return this.dataStore.errorMessage;
    },
    errorCode(){
      return this.dataStore.errorCode;
    }
  },
  mounted() {
    this.userName = this.authStore.user.name;
  },
  methods: {
    changeCaption(event) {
      const file = event.target.files[0];
      if (file) {
        document.getElementById("file-label").innerHTML = '<span class="pi pi-file mx-3"></span>' + file.name;
        this.userAvatar = file;
      } else {
        document.getElementById("file-label").innerHTML = '<span class="pi pi-upload mx-3"></span>Выбрать новый аватар';
        this.userAvatar = null;
      }
    },
    async updateUser(){
      const formData = new FormData();
      formData.append("name", this.userName);
      console.log("THIS IS", this.userName);
      formData.append('image', this.userAvatar);
      await this.dataStore.update_user(this.authStore.user.id, formData);
      if (this.errorCode > 0)
      {
        this.$toast.add({severity:'error', summary: "Ошибка обновления данных", detail: this.errorMessage, life: 4000});
      }
      else
      {
        this.$toast.add({severity:'success', summary: "Данные успешно обновлены", detail: this.errorMessage, life: 4000});
      }
    }
  }
}
</script>
<style scoped>

</style>
