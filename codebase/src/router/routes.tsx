import { AccountsView } from "@features/accounts";
import { CanvasPlaygroundView } from "@features/canvasPlayground/CanvasPlaygroundView";
import { PlaygroundView } from "@features/playground/PlaygroundView";

export const routes = [
  { path: '/', component: AccountsView, title: 'Home' },
  { path: '/canvas', component: CanvasPlaygroundView, title: 'Canvas' },
  { path: '/playground', component: PlaygroundView, title: 'Playground' },
];
