import { createDevApp } from '@backstage/dev-utils';
import { ik8SPluginPlugin, Ik8SPluginPage } from '../src/plugin';

createDevApp()
  .registerPlugin(ik8SPluginPlugin)
  .addPage({
    element: <Ik8SPluginPage />,
    title: 'Root Page',
    path: '/ik8s-plugin',
  })
  .render();
