import { PLUGINS_CONTAINER_ID } from './../constants';
import { getShadowRoot } from './getShadowRoot';

export const getPluginElement = () =>
  getShadowRoot().getElementById(PLUGINS_CONTAINER_ID);
