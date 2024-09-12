import { createApp } from 'vue';

import { registerAccessDirective } from '@vben/access';
import { initStores } from '@vben/stores';
import '@vben/styles';
import '@vben/styles/ele';

import { setupI18n } from '#/locales';

import App from './app.vue';
import { router } from './router';

import { VueQueryPlugin } from '@tanstack/vue-query'


async function bootstrap(namespace: string) {
  const app = createApp(App);

  // 国际化 i18n 配置
  await setupI18n(app);

  // 配置 pinia-tore
  await initStores(app, { namespace });

  // 安装权限指令
  registerAccessDirective(app);

  // 配置路由及路由守卫
  app.use(router);

  // Vue Query
  app.use(VueQueryPlugin);

  app.mount('#app');
}

export { bootstrap };
