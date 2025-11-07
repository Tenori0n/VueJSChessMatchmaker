import {createRouter, createWebHistory} from "vue-router";
import Matches from "@/components/Matches.vue";
import Users from "@/components/Users.vue";
import Registration from "@/components/Registration.vue";
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
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
