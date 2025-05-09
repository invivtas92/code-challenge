import React from 'react';
import { configService } from '@services/config/config.service';

const TanStackRouterDevtools = configService.getEnv().MODE === 'production'
  ? () => null
  : React.lazy(() =>
    import('@tanstack/router-devtools').then((res) => ({
      default: res.TanStackRouterDevtools,
    })),
  );

export default TanStackRouterDevtools;