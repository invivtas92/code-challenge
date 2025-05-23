import { AccountsView } from "@features/accounts";

export const routes = [
  { path: '/', component: AccountsView },
  { path: '/test', component: () => <div>test</div> },
];
