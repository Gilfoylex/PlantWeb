import { createRouter, createWebHistory } from 'vue-router'
import PlantInfoView from '../views/PlantInfoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/:id',
      name: 'PlantInfo',
      component: PlantInfoView
    },
    // {
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   path : '/:id',
    //   name : 'plant_info',
    //   component : () => import('../views/PlantInfoView.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next(false); // 如果是根路径，则禁止导航
  } 
  else {
    next(); // 否则允许导航
  }
});


export default router
