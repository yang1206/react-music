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
