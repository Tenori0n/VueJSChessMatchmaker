import {createRouter, createWebHistory} from "vue-router";
import Matches from "@/components/Matches.vue";
import Users from "@/components/Users.vue";
import Registration from "@/components/Registration.vue";
import TurnsTable from "@/components/TurnsTable.vue";
import UserProfile from "@/components/UserProfile.vue";
import UserProfileEdit from "@/components/UserProfileEdit.vue";
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
  },
  {
    path: '/user/:id',
    component: UserProfile,
  },
  {
    path: '/user/:id/edit',
    component: UserProfileEdit,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
