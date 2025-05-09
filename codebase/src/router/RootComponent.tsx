import { Outlet, useMatches } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Suspense, useEffect } from "react";
import styles from './RootComponent.module.scss';

const RootComponent = () => {
  const matches = useMatches();

  useEffect(() => {
    const title = matches.map(({ context }) => context.pageName).filter(Boolean).join(' - ');

    document.title = title;
  }, [matches]);

  return (
    <div className={styles.main}>
      <Outlet />
      <Suspense fallback={null}>
        <TanStackRouterDevtools />
      </Suspense>
    </div>
  );
}

export { RootComponent };