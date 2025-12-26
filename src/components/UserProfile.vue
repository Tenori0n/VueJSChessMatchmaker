<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from "@/stores/DataStore.js";
import {useAuthStore} from "@/stores/AuthStore.js";
export default {
  name : "UserProfile",
  components: {DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      authStore: useAuthStore(),
      loading_p: true,
      loading_m: true,
      loading_mt: true,
      loading_u: true,
    }
  },
  watch:{
    userProfile: function (){
      this.loading_p = false;
      console.log("User=", this.userProfile);
    },
    user: function(){
      this.loading_u = false;
    },
    lastMatches: function(){
      this.loading_m = false;
      console.log("Matches=", this.lastMatches)
    },
  },
  computed:{
    userProfile() {
      return this.dataStore.profile;
    },
    user()
    {
      return this.dataStore.user;
    },
    lastMatches() {
      return this.dataStore.last_matches;
    },
    ImgUrl() {
      if (this.userProfile.avatar != null)
        return this.userProfile.avatar;
      else
        return 'https://storage.yandexcloud.net/avatarstorage/user_avatar/default.png';
    }
  },
  mounted() {
    console.log("UserProfile component mounted");
    this.dataStore.get_user(this.$route.params.id);
    this.dataStore.get_last_5_matches_by_id(this.$route.params.id);
    this.dataStore.get_users();
    console.log("User=", this.userProfile);
  },
  methods: {
    useAuthStore
  }
}
</script>

<template>
  <div v-if="!loading_p">
  <div v-if="userProfile.name != null">

      <div class="flex items-center justify-center">
        <img height="200" width="200" :src="ImgUrl">
        <div class="flex flex-col items-center justify-center !text-white text-xl !ml-5">
          <p class="!text-3xl !font-bold">{{userProfile.name}}</p>
          <router-link class="!ml-5 !text-yellow-500" :to="'/user/' + userProfile.id + '/edit'" v-if="(authStore.isAuthenticated && authStore.user.is_admin) || (authStore.isAuthenticated && authStore.user.name == userProfile.name)">(Редактировать профиль)</router-link>
          <p v-else><br> </p>
          <p>ЭЛО: {{userProfile.elo}}</p>
          <p>Количество сыгранных игр: {{userProfile.gamesPlayed}}</p>
          <p>Количество выигранных игр: {{userProfile.gamesWon}}</p>
        </div>
      </div>

    <DataTable
      v-if="!(loading_m || loading_u) && dataStore.last_matches[0] != null"
      :value="lastMatches"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="5"
      :totalRecords="5"
      responsive-layout="scroll"
      :laading="true"
      :first="offset"
    >
      <Column field="id" header="№"/>
      <Column field="white_ID" header="Название матча">
        <template #body="slotProps">
          <a class="!text-white !font-bold" :href="'/match/' + slotProps.data.id">{{this.user.find(us => us.id === slotProps.data.white_ID).name}} против {{this.user.find(us => us.id === slotProps.data.black_ID).name}}</a>
        </template>
      </Column>
      <Column field="winnerColor" header="Имя победителя">
        <template #body="slotProps">
          <a class="!text-white !font-bold" v-if="slotProps.data.winnerColor == true" :href="'/user/' + slotProps.data.black_ID">{{this.user.find(us => us.id === slotProps.data.black_ID).name}}</a>
          <a class="!text-white !font-bold" v-else :href="'/user/' + slotProps.data.white_ID">{{this.user.find(us => us.id === slotProps.data.white_ID).name}}</a>
        </template>
      </Column>
    </DataTable>
    <p class="!text-xl !text-white !text-center" v-else>Этот пользователь пока не сыграл ни одного матча!</p>
  </div>
  <p class="text-center !text-white !text-center" v-else>Такого пользователя не существует!</p>
  </div>
  <p v-else></p>
</template>

<style scoped>

</style>
