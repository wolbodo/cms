'use strict';
const compose = require('koa-compose');

module.exports = ({ strapi }) => ({
  login: compose([
    async (ctx, next) => {
      console.log(ctx.request.header)
      const username = ctx.request.header['x-user'] || 'dexter'
      const email = ctx.request.header['x-email'] || 'dexter@dxlb.nl'
      console.log("Should login", username, email)

      if (username && email) {
        strapi.log.info('In members-login middleware.', ctx.state.user);
        let user = await strapi.service('admin::user').findOneByEmail(email)
        console.log("Found", user)

        if (!user) {
          const role = await strapi.service('admin::role').findOne({ name: 'Author' })
          user = await strapi.service('admin::user').create({ firstname: username, email, isActive: true, roles: [role.id] });
        }

        ctx.state.user = user
      }

      next()
    },
    (ctx) => {
      const { user } = ctx.state;

      ctx.body = {
        data: {
          token: strapi.service('admin::token').createJwtToken(user),
          user: strapi.service('admin::user').sanitizeUser(ctx.state.user), // TODO: fetch more detailed info
        },
      };
    },
  ]),
});
