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
    ['/api/users', '/api/auth'],
    createProxyMiddleware({
      target: process.env.REACT_APP_USER_SERVICE_PATH,
      changeOrigin: true,
    })
  );
  app.use(
    ['/api/availability', '/api/lodge', '/api/photo', '/api/price'],
    createProxyMiddleware({
      target: process.env.REACT_APP_LODGING_SERVICE_PATH,
      changeOrigin: true,
    })
  );
  app.use(
    ['/api/host-ratings', '/api/lodge-ratings'],
    createProxyMiddleware({
      target: process.env.REACT_APP_RATING_SERVICE_PATH,
      changeOrigin: true,
    })
  );
};