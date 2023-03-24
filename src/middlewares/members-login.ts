import { Strapi } from '@strapi/strapi';

/**
 * `members-login` middleware
 */

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const username = ctx.request.header['X-User']
    const email = ctx.request.header['X-Email']

    let user = await strapi.plugins['users-permissions'].services.user.fetch({ email });

    if (!user) {
      user = await strapi.plugins['users-permissions'].services.user.add({ username, email });
    }
    strapi.log.info('In members-login middleware.');

    await next();
  };
};
