module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: 'loginController.login',
    config: {
      auth: false,
      policies: [],
    },
  },
];
