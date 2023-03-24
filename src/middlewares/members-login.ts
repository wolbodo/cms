import { Strapi } from '@strapi/strapi';

/**
 * `members-login` middleware
 */

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const user = ctx.request.header['X-User']
    const email = ctx.request.header['X-Email']


    strapi.log.info('In members-login middleware.');

    await next();
  };
};
