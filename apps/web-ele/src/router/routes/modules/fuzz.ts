import type { RouteRecordRaw } from 'vue-router';

// import { VBEN_LOGO_URL } from '@vben/constants';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:file-plus',
      order: 3,
      title: $t('page.fuzz.title'),
    },
    name: 'FuzzProject',
    path: '/fuzz-admin',
    children: [
      {
        name: 'FuzzOpen',
        path: '/fuzz-admin/fuzz-open',
        component: () => import('#/views/fuzz/open/index.vue'),
        meta: {
          icon: 'lucide:code',
          title: $t('page.fuzz.open'),
        },
      },
      {
        name: 'FuzzWeb',
        path: '/fuzz-admin/fuzz-web',
        component: () => import('#/views/fuzz/web/index.vue'),
        meta: {
          icon: 'lucide:package',
          title: $t('page.fuzz.web'),
        },
      },
      {
        name: 'FuzzClose',
        path: '/fuzz-admin/fuzz-close',
        component: () => import('#/views/fuzz/close/index.vue'),
        meta: {
          icon: 'lucide:copyright',
          title: $t('page.fuzz.close'),
        },
      },
    ],
  },
];

export default routes;
