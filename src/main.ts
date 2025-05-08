import { createSSRApp } from "vue";
import App from "./App.vue";

// import { VXETable, VxeTable } from 'vxe-table'

export function createApp() {
  const app = createSSRApp(App);
  return { app };
}

import "./ui/index.sass"
