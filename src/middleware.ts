import { defineMiddleware } from 'astro:middleware';
import { isPublicPath } from './lib/routing';

// Minimal middleware just to handle public paths
export const onRequest = defineMiddleware(async ({ url }, next) => {
  if (isPublicPath(url.pathname)) {
    return next();
  }
  return next();
});