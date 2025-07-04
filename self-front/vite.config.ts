import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ uni() ],
});
