import { Suspense, useEffect, useState } from "react";
import styles from './RootComponent.module.scss';
import { Link } from "./Link";
import { routes } from "./routes";

export const SimpleRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname);
    };
    // using popstate event as it is fired when user clicks browser back/forward buttons
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  useEffect(() => {
    console.log('currentPath', currentPath);
    //set document.title here
  }, [currentPath]);

  const route = routes.find(r => r.path === currentPath);
  const Component = route ? route.component : () => <div>not found</div>;

  return (
    <div className={styles.main}>
      <nav className={styles.nav}>
        <Link to={routes[0].path}>Home</Link>
        <Link to={routes[1].path}>test</Link>
      </nav>
      <Suspense fallback={<div>Router Loading...</div>}>
        <Component />
      </Suspense>
    </div>
  );
}
