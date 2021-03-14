import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/teams',
      component: () => import('./components/teams/TeamsList.vue'),
      alias: '/'
    },
    {
      path: '/users',
      component: () => import('./components/users/UsersList.vue')
    },
    {
      path:'/teams/:teamId',
      component: () => import('./components/teams/TeamMembers.vue'),
      props: true
    },
    { path: '/', redirect: '/teams' },
    { path: '/:notFound(.*)', component: () => import('./components/nav/NotFound.vue')}
  ]
});

const app = createApp(App);
app.use(router);
app.mount('#app');
