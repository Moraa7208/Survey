import {createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import login from '../views/login.vue';
import register from '../views/register.vue';
import Defaultlayout from '../components/Defaultlayout.vue';
import authlayout from '../components/authlayout.vue';
import servuys from '../views/servuys.vue';
import store  from '../store';

const routes = [    
    {
        path: '/',
        redirect:  '/Dashboard',
        component: Defaultlayout,
        meta: { requiresAuth: true},
        children: [
            {path: '/Dashboard', name: 'Dashboard', component: Dashboard},
            {path: '/servuys', name: 'servuys', component: servuys},
        ]
    },

    {
        path: '/auth',
        redirect:  '/login',
        name: 'auth',
        component: authlayout,
        meta: {isGuest: true},
        children: [
            {
                path: '/login',
                name: 'login',
                component: login
            },
            {
                path: '/register',
                name: 'register',
                component: register
            },
        ]
    },

]   

const router = createRouter({
    history: createWebHistory(),
    routes,
  })


router.beforeEach((to, from, next) => {
     if (to.meta.requiresAuth && !store.state.user.token) {       
        next({name: 'login'})
     }else if (store.state.user.token && (to.meta.isGuest)){
        next({name: 'Dashboard'});
     } else {
        next();
     }
  }
)

export default router;