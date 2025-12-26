<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from "@/stores/DataStore.js";
export default {
  name : "UsersTable",
  components: {DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
      loading_u: false,
      loading_ut: false,
    }
  },
  watch:{
    user: function(){
      this.loading_u = false;
    },
    user_total: function(){
      this.loading_ut = false;
    }
  },
  computed:{
    user() {
      return this.dataStore.user;
    },
    user_total()
    {
      return this.dataStore.user_total;
    }
  },
  mounted() {
    console.log("UsersTable component mounted");
    if (!this.user || this.user.length == 0)
    {
      this.loading_u = true;
      this.dataStore.get_users();
    }
    if (!this.user_total || this.user_total.length == 0)
    {
      this.loading_ut = true;
      this.dataStore.get_users_total();
    }
    console.log("Users=", this.user);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_users(this.offset / this.perpage, this.perpage);
    }
  }
}
</script>

<template>
  <DataTable
    v-if="!(loading_u || loading_ut)"
    :value="user"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[5, 10, 20]"
    :totalRecords="user_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :laading="true"
    :first="offset"
  >
    <Column header="№">
      <template #body="slotProps">
        {{ slotProps.index + 1 }}
      </template>
    </Column>
    <Column field="name" header="Имя пользователя">
      <template #body="slotProps">
        <a class="!text-white !font-bold" :href="'/user/' + slotProps.data.id">{{slotProps.data.name}}</a>
      </template>
    </Column>
    <Column field="gamesPlayed" header="Количество сыгранных игр"/>
    <Column field="gamesWon" header="Количество выигранных игр"/>
    <Column field="elo" header="ЭЛО"/>
  </DataTable>
</template>

<style scoped>

</style>
