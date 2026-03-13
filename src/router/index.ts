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
        // Cho phép nếu đến từ login HOẶC có session data (refresh case)
        const sessionData = sessionStorage.getItem('lootoo_session');
        const hasValidSession = sessionData !== null;
        const isFromLogin = from.name === 'login';
        
        if((!isFromLogin && !hasValidSession) ||
            !username || (username as string).length > 20 ||
            !room || (room as string).length > 11){
            return { name: 'login' };
        }
        return true;
    }
})


export default router




