import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { RootComponent } from "./RootComponent";

interface RouterContext {
  queryClient: QueryClient,
  pageName: string
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootComponent
});