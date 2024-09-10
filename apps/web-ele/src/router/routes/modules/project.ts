import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ant-design:bar-chart-outlined',
      order: -99,
      title: $t('page.project.title'),
    },
    name: 'project',
    path: '/project',
    children: [
      {
        name: 'Project',
        path: '/project',
        component: () => import('#/views/project/index.vue'),
        meta: {
          title: $t('page.project.title'),
        },
      },
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
