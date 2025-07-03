import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:shield-alert',
      order: 2,
      title: $t('漏洞清单'),
    },
    name: '_BugList',
    path: '/buglist',
    children: [
      {
        name: 'BugList',
        path: '/buglist',
        component: () => import('#/views/bug-list/index.vue'),
        meta: {
          affixTab: true,
          hideInMenu: true, // 不在菜单中显示
          icon: 'lucide:shield-alert',
          title: $t('漏洞清单'),
        },
      },
    ],
  },
];

export default routes;
