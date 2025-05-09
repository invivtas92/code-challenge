import { createLazyRoute } from "@tanstack/react-router";
import { SimpleLoading } from "@/commons/components/SimpleLoading";
// import { SimpleErrorAndReload } from "@/commons/components/SimpleErrorAndReload";
// import { pageName } from ".";

const Route = createLazyRoute('/')({
  component: AccountsVC
});

function AccountsVC() {
  // if (!isSuccess && !isFetching) {
  //   return <SimpleErrorAndReload error={error} pageName={pageName} reload={reload}/>;
  // }

  return <SimpleLoading />;
};

export { AccountsVC, Route };