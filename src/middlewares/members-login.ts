import { Strapi } from '@strapi/strapi';

/**
 * `members-login` middleware
 */

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    console.log(ctx.request.header)
    const username = ctx.request.header['x-user'] || 'dexter'
    const email = ctx.request.header['x-email'] || 'dexter@dxlb.nl'
    console.log("Should login", username, email)

    if (username && email) {
      strapi.log.info('In members-login middleware.', ctx.state.user);
      let user = await strapi.services['admin::user'].findOneByEmail(email)
      console.log("Found", user)

      if (!user) {
        const role = await strapi.services['admin::role'].findOne({ name: 'Author' })
        user = await strapi.services['admin::user'].create({ firstname: username, email, isActive: true, roles: [role.id] });
      }

      ctx.state.user = user
    }

    await next();
  };
};
