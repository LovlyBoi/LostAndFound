import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Home from '@/pages/home/index.vue'
import Detail from '@/pages/detail/index.vue'
import PublishLost from '@/pages/publishLost/index.vue'
import PublishFound from '@/pages/publishFound/index.vue'
import Login from '@/pages/login/index.vue'
import Setup from '@/pages/setup/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/detail/:id',
    component: Detail,
  },
  {
    path: '/publishLost',
    component: PublishLost,
  },
  {
    path: '/publishFound',
    component: PublishFound,
  },
  {
    path: '/setup',
    component: Setup,
  },
  {
    path: '/login',
    component: Login,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
