import { defineConfig } from '@vben/vite-config';

import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [
        ElementPlus({
          format: 'esm',
        }),
      ],
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
<<<<<<< HEAD
            
            target: 'http://192.168.200.146:5330/api',
=======
            target: 'http://localhost:5330/api',
            // target: 'http://192.168.200.146:5330/api',
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
            ws: true,
          },
        },
      },
    },
  };
});
