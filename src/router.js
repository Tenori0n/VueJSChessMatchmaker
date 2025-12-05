import {createRouter, createWebHistory} from "vue-router";
import Matches from "@/components/Matches.vue";
import Users from "@/components/Users.vue";
import Registration from "@/components/Registration.vue";
import TurnsTable from "@/components/TurnsTable.vue";
const routes = [
  {
    path: '/match',
    component: Matches,
  },
  {
    path: '/user',
    component: Users,
  },
  {
    path: '/user/create',
    component: Registration,
  },
  {
    path: '/match/:id',
    component: TurnsTable,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
