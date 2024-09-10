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
    ],
  },
];

export default routes;
