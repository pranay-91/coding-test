export default {
  app: {
    port: parseInt(process.env.PORT ?? '8080'),
    hostname: process.env.HOSTNAME || 'localhost',
  },
};
