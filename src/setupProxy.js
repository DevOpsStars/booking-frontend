const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api/auth',
    createProxyMiddleware({
      target: 'http://host.docker.internal:8000',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/users',
    createProxyMiddleware({
      target: 'http://host.docker.internal:8000',
      changeOrigin: true,
    })
  );
};