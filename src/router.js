import Router from 'vue-router';
import store from './shared/src/vuex-store';
import {IS_AUTHED_G as IS_AUTHED_G } from './shared/src/vuex-store/constants/auth';

import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Home from './views/Home.vue';
import MyProfile from './views/MyProfile.vue';
import Friends from './views/Friends.vue';
import Friend from './views/Friend.vue';
import FriendInvited from './views/friend-invited'
import FriendInviting from './views/friend-inviting'


export const loginRoute = {
  path: '/login',
  name: 'login',
  component: Login,
  meta: { redirectsIfAuth: true },
};

export const registerRoute = {
  path: '/register',
  name: 'register',
  component: Register,
  meta: { redirectsIfAuth: true },
};

export const homeRoute = {
  path: '/',
  name: 'home',
  component: Home,
  meta: { requiresAuth: true },
};

export const myProfileRoute = {
  path: '/me',
  name: 'me',
  component: MyProfile,
  meta: { requiresAuth: true },
};

export const friendsRoute = {
  path: '/friends',
  name: 'friends',
  component: Friends,
  meta: { requiresAuth: true },
};

export const friendRoute = {
  path: '/friend/:id',
  name: 'friend',
  component: Friend,
  meta: { requiresAuth: true },
};

export const friendInvitedRoute = {
  path: '/friend-invited',
  name: 'friend-invited',
  component: FriendInvited,
  meta: { requiresAuth: true },
};

export const friendInvitingRoute = {
  path: '/friend-inviting',
  name: 'friend-inviting',
  component: FriendInviting,
  meta: { requiresAuth: true },
};

export const routes = [
  loginRoute,
  registerRoute,
  homeRoute,
  myProfileRoute,
  friendsRoute,
  friendRoute,
  friendInvitedRoute,
  friendInvitingRoute,
];

const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters[IS_AUTHED_G]) {
      next({
        name: loginRoute.name,
        query: { next: to.name },
      });
    }
  }

  if (to.matched.some(record => record.meta.redirectsIfAuth)) {
    if (store.getters[IS_AUTHED_G]) {
      next({
        name: homeRoute.name,
      });
    }
  }
  next();
});

export default router;
