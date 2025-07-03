import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
<<<<<<< HEAD
      order: 1,
      title: $t('任务概览'),
=======
      order: -1,
      title: $t('page.dashboard.title'),
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
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
          hideInMenu: true, // 不在菜单中显示
          icon: 'lucide:area-chart',
          title: $t('page.dashboard.index'),
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
