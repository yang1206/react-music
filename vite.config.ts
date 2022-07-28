import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
//按需导入
import vitePluginImp from 'vite-plugin-imp'
import eslintPlugin from 'vite-plugin-eslint' // 引入
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    //antd样式按需导入
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: name => `antd/es/${name}/style`
        }
      ]
    }),
    // 配置eslintPlugin
    eslintPlugin({
      cache: false,
      include: /\.(jsx?|tsx?|vue|svelte)$/
    })
  ],
  server: {
    host: true, // host设置为true才可以使用network的形式，以ip访问项目
    // port: 8080, // 端口号
    open: true, // 自动打开浏览器
    cors: true, // 跨域设置允许
    strictPort: true // 如果端口已占用直接退出
    // 接口代理
    // proxy: {
    //   '/api': {
    //     // 本地 8000 前端代码的接口 代理到 8888 的服务端口
    //     target: 'https://lianghj.top:8888/api/private/v1/',
    //     changeOrigin: true, // 允许跨域
    //     rewrite: (path) => path.replace('/api/', '/'),
    //   },
    // },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#4377FE' //设置antd主题色
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
