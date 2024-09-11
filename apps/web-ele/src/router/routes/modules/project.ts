import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      order: -99,
      title: $t('page.project.detail'),
      hideInMenu: true,
    },
    name: 'Project',
    path: '/',
    children: [
      {
        name: 'ProjectDetail',
        path: '/project-detail',
        component: () => import('#/views/project-detail/index.vue'),
        meta: {
          hideInMenu: true,
          title: $t('page.project.detail'),
        },
      },
    ],
  },
];

export default routes;
