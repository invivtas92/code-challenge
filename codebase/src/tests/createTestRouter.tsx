import { createRootRoute, createRoute, createRouter, Outlet, createMemoryHistory, RouterProvider, Register } from "@tanstack/react-router";

interface CreateTestRouteProps {
  component: React.ReactNode
  routePath: string
  currentPath: string
}

export const createTestRouter = ({ component, routePath, currentPath }: CreateTestRouteProps) => {
  const rootRoute = createRootRoute({
    component: Outlet
  });

  const testRoute = createRoute({
    path: routePath,
    getParentRoute: () => rootRoute,
    component: () => component
  });
  const routeTree = rootRoute.addChildren([testRoute]);


  const memoryHistory = createMemoryHistory({
    initialEntries: [currentPath],
  });

  const router = createRouter({
    defaultPendingMinMs: 0,
    routeTree,
    history: memoryHistory
  });

  return <RouterProvider router={router as unknown as Register["router"]} />;
};

