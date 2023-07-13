// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "/list",
        name: "List",
        component: () => import("@/views/List.vue"),
      },
      {
        path: "/table/:tname",
        name: "Table",
        component: () => import("@/views/Table.vue"),
      },
      {
        path: "/table/insert/:tname",
        name: "Insert",
        component: () => import("@/views/Insert.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
