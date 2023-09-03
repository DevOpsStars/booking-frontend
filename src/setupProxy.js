const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api/requests',
    createProxyMiddleware({
      target: process.env.REACT_APP_BOOKING_SERVICE_PATH,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/users',
    createProxyMiddleware({
      target: process.env.REACT_APP_USER_SERVICE_PATH,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/auth', 
    createProxyMiddleware({
      target: process.env.REACT_APP_USER_SERVICE_PATH,
      changeOrigin: true,
    })
  );
  
};