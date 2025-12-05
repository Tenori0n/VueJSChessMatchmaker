<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from "@/stores/DataStore.js";
export default {
  name : "TurnsTable",
  components: {DataTable, Column },
  data() {
    return {
      columns: [],
      dataStore: useDataStore(),
      perpage: 10,
      offset: 0,
      loading_t: true,
      loading_tt: true,
      loading_m: true,
      loading_u: true,
    }
  },
  watch:{
    user: function(){
      this.loading_u = false;
    },
    chessMatches: function(){
      this.loading_m = false;
      console.log("MATCHES=", this.chessMatches);
    },
    turn: function(){
      this.loading_t = false;
      console.log("TURNS=", this.turn);
    },
    turn_total: function(){
      this.loading_tt = false;
      console.log(this.turn_total);
    }
  },
  computed:{
    chessMatches() {
      return this.dataStore.match;
    },
    turn() {
      return this.dataStore.turn;
    },
    turn_total() {
      return this.dataStore.turn_total;
    },
    user()
    {
      return this.dataStore.user;
    }
  },
  mounted() {
    console.log("TurnsTable component mounted");
    this.dataStore.get_users();
    this.dataStore.get_matches();
    this.dataStore.get_turns(0, 10, this.$route.params.id);
    this.dataStore.get_turns_total(this.$route.params.id);
    console.log("Turns=", this.turn);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_turns(this.offset / this.perpage, this.perpage, this.$route.params.id);
    }
  }
}
</script>

<template>
  <p class="text-center" v-if="!(loading_u || loading_m)">
    <a class="text-center text-4xl !font-bold !mb-3 !mx-1 !mx-md-4 !mt-4 !text-yellow-500" :href="'/user/' + this.chessMatches.find(mt => mt.id == this.$route.params.id).white_ID">{{this.user.find(us => us.id == this.chessMatches[0].white_ID).name}}</a>
    <span class="text-center text-4xl !font-bold !mb-3 !mx-1 !mx-md-4 !mt-4 !text-white">против</span>
    <a class="text-center text-4xl !font-bold !mb-3 !mx-1 !mx-md-4 !mt-4 !text-yellow-500" :href="'/user/' + this.chessMatches.find(mt => mt.id == this.$route.params.id).black_ID">{{this.user.find(us => us.id == this.chessMatches[0].black_ID).name}}</a>
  </p>
  <DataTable
    v-if="!(loading_t || loading_tt)"
    :value="turn"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[5, 10, 20]"
    :totalRecords="turn_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :laading="true"
    :first="offset">
    <Column field="id" header="№"/>
    <Column field="white" header="Ход белых"/>
    <Column field="black" header="Ход черных"/>
  </DataTable>
</template>

<style scoped>

</style>
