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
  debugger
  if (user.preferedLanguage) {
    changeLocale(user.preferedLanguage);
  }

  auth.setToken(token);
  auth.setUserInfo(user);

  redirectToPreviousLocation();
};


export default {
  register() { },
  bootstrap(app) {
    if (auth.getToken() === null) {
      console.log("Should login")
      login().then(res => console.log("LOGIN:", res)).catch(e => console.error("LOGIN ERR:", e))
    }

  }
};
