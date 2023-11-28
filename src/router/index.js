import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import('../views/Main.vue'),
      children: [
        {
          path: '/home',
          alias: '/',
          name: 'home',
          component: () => import('../views/Home/Home.vue')
        },
        {
          path: '/mall',
          name: 'mall',
          component: () => import('../views/Mall/Mall.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../views/User/User.vue')
        },
        {
          path: '/page1',
          name: 'page1',
          component: () => import('../views/Page1.vue')
        },
        {
          path: '/page2',
          name: 'page2',
          component: () => import('../views/Page2.vue')
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login/Login.vue")
    },
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: '404',
    //   component: () => import("../views/404.vue")
    // }

  ]
})

export default router