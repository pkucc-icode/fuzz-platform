import type { RouteRecordRaw } from 'vue-router';

import { VBEN_LOGO_URL } from '@vben/constants';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      badgeType: 'dot',
      icon: VBEN_LOGO_URL,
      order: 9999,
      title: $t('page.vben.title'),
    },
    name: 'VbenProject',
    path: '/vben-admin',
    children: [
      {
        name: 'VbenAbout',
        path: '/vben-admin/about',
        component: () => import('#/views/_core/about/index.vue'),
        meta: {
          icon: 'lucide:copyright',
          title: $t('page.vben.about'),
        },
      },
      {
        name: 'VbenDocument',
        path: '/vben-admin/document',
        component: () => import('#/views/fuzz/open/index.vue'),
        meta: {
          icon: 'lucide:book-open-text',
          title: $t('page.vben.document'),
        },
      },
    ],
  },
];

export default routes;
