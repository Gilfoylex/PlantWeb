// import { fileURLToPath, URL } from 'node:url'

// import { defineConfig} from 'vite'
// import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   base: '/', //
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:5219", // 请将此替换为您的 ASP.NET Core 服务端的地址和端口
//         changeOrigin: true,
//         //rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// })

import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default ({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());

  // 返回配置对象
  return defineConfig({
    plugins: [vue()],
    base: env.VITE_APP_BASE_URL,  //和nginx配置中的 location对应，否则会空白
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APP_API_URL, // 使用环境变量作为代理目标
          changeOrigin: true,
        },
      },
    },
  });
};
