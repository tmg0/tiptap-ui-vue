import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

export default defineConfig({
  entry: 'src/index.ts',
  dts: true,
  plugins: [Vue()],
})
