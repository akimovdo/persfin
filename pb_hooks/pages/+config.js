/**
 * Конфигурация PocketPages
 */
module.exports = {
  plugins: [
    'pocketpages-plugin-ejs',
    'pocketpages-plugin-datastar',
    { 
      name: 'pocketpages-plugin-js-sdk', 
      host: process.env.PP_HOST || 'http://127.0.0.1:8090' 
    },
    { 
      name: 'pocketpages-plugin-auth', 
      collection: 'users' 
    },
  ],
  debug: false,
};
