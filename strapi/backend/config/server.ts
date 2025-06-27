
const XY = 'http'

export default ({ env }) => ({
  //host: env('HOST', '0.0.0.0'),
  //port: env.int('PORT', 1337),
  url: XY + '://' + env('HOST', '0.0.0.0') + ':' + env.int('PORT', 1337) + '/strapi',
  app: {
    keys: env.array('APP_KEYS'),
  }
});
