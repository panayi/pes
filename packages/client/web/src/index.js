/* eslint-disable no-console */
import http from 'http';
import app from './server';

const server = http.createServer(app);

let currentApp = app;

server.listen(process.env.PORT || 3000, error => {
  if (error) {
    console.log(error);
  }

  console.log('🚀 started');
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    // eslint-disable-next-line global-require
    const newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
