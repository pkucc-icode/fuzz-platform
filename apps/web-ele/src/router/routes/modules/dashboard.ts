import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('page.dashboard.title'),
    },
    name: 'Dashboard',
    path: '/',
    children: [
      {
        name: 'Analytics',
        path: '/analytics',
        component: () => import('#/views/project/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('page.project.title'),
        },
      },
      // {
      //   name: 'Workspace',
      //   path: '/workspace',
      //   component: () => import('#/views/dashboard/workspace/index.vue'),
      //   meta: {
      //     title: $t('page.dashboard.workspace'),
      //   },
      // },
    ],
  },
];

export default routes;
