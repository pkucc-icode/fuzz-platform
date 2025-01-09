import type { RouteRecordRaw } from 'vue-router';

// import { VBEN_LOGO_URL } from '@vben/constants';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      badgeType: 'dot',
      icon: 'icon-park-outline:audit',
      order: 5,
      title: $t('page.fuzz.audit'),
    },
    name: 'CodeAuditMenu',
    path: '/_code-audit',
    children: [
      {
        name: 'CodeAudit',
        path: '/code-audit',
        component: () => import('#/views/fuzz/audit/index.vue'),
        meta: {
          icon: 'icon-park-outline:audit',
          title: $t('page.fuzz.audit'),
          hideInMenu: true,
        },
      },
    ],
  },
];

export default routes;
