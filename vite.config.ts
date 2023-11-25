import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import svgLoader from 'vite-svg-loader'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const { mode } = config
  const env = loadEnv(mode, process.cwd())
  return {
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
    }),
    VueSetupExtend(),
    svgLoader(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
  css: {
      preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.less";',
      },
    },
    },
  server: {
    host: 'localhost',
    port: Number(env.VITE_APP_PORT),
    proxy: {
      [env.VITE_APP_BASE_API]: {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  }
})
