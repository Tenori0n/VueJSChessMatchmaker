<script>
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import {useDataStore} from "@/stores/DataStore.js";
  export default {
    name : "ChessMatches",
    components: {DataTable, Column },
    data() {
      return {
        dataStore: useDataStore(),
        perpage: 10,
        offset: 0,
        loading_m: false,
        loading_mt: false,
        loading_u: false,
      }
    },
    watch:{
      user: function(){
        this.loading_u = false;
      },
      chessMatches: function(){
        this.loading_m = false;
      },
      chessMatches_total: function(){
        this.loading_mt = false;
      }
    },
    computed:{
      chessMatches() {
        return this.dataStore.match;
      },
      chessMatches_total() {
        return this.dataStore.match_total;
      },
      user()
      {
        return this.dataStore.user;
      }
    },
    mounted() {
      console.log("ChessMatches component mounted");
      if (!this.chessMatches || this.chessMatches.length == 0)
      {
        this.loading_m = true;
        this.dataStore.get_matches();
      }
      if (!this.chessMatches_total || this.chessMatches_total.length == 0)
      {
        this.loading_mt = true;
        this.dataStore.get_matches_total();
      }
      if (!this.user || this.user.length == 0) {
        this.loading_u = true;
        this.dataStore.get_users();
      }
      console.log("ChessMatches=", this.chessMatches);
      console.log("Users=", this.user);
    },
    methods: {
      onPageChange(event) {
        this.offset = event.first;
        this.perpage = event.rows;
        this.dataStore.get_matches(this.offset / this.perpage, this.perpage);
      }
    }
  }
</script>

<template>
  <DataTable
    v-if="!(loading_m || loading_mt || loading_u)"
    :value="chessMatches"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[5, 10, 20]"
    :totalRecords="chessMatches_total"
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
</template>

<style scoped>

</style>
