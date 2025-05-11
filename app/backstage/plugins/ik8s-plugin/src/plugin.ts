import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const ik8SPluginPlugin = createPlugin({
  id: 'ik8s-plugin',
  routes: {
    root: rootRouteRef,
  },
});

export const Ik8SPluginPage = ik8SPluginPlugin.provide(
  createRoutableExtension({
    name: 'Ik8SPluginPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
