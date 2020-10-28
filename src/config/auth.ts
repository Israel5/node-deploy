export default {
  jwt: {
    secret: process.env.APP_SECRET || 'logmapping',
    expiresIn: '1d',
  },
};
