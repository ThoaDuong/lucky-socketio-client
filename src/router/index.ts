import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/room',
    name: 'room',
    component: () => import('@/views/RoomView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
    if(to.name === 'room'){
        const { username, room } = to.query;
        if(from.name !== 'login' ||
            !username || username.length > 20 ||
            !room || room.length > 10){
            return { name: 'login' };
        }
        return true;
    }
})


export default router




