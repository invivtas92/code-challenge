import { AccountsView } from "@features/accounts";
import { CanvasPlaygroundView } from "@features/canvasPlayground/CanvasPlaygroundView";

export const routes = [
  { path: '/', component: AccountsView, title: 'Home' },
  { path: '/canvas', component: CanvasPlaygroundView, title: 'Canvas' },
];
