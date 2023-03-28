import { auth } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import axios from 'axios';

const login = async () => {
  const {
    data: {
      data: { token, user },
    },
  } = await axios({
    method: 'POST',
    url: `${strapi.backendURL}/members/login/`,
  });

  if (user.preferedLanguage) {
    changeLocale(user.preferedLanguage);
  }

  auth.setToken(token);
  auth.setUserInfo(user);
};


export default {
  register() { },
  bootstrap(app) {
    if (auth.getToken() === null) {
      login().catch(e => console.error("LOGIN ERR:", e))
    }

  }
};
