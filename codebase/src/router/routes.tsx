import { AccountsView } from "@features/accounts";

export const routes = [
  { path: '/', component: AccountsView, title: 'Home' },
  { path: '/test', component: () => <div>test</div>, title: 'Test' },
];
