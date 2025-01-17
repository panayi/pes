import { Component } from 'react';
import env from '@pesposa/core/src/config/env';

export class HotjarProvider extends Component {
  componentDidMount() {
    if (env.firebaseProject === 'pesposa-production') {
      /* eslint-disable */
      (function(h, o, t, j, a, r) {
        h.hj =
          h.hj ||
          function() {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
        h._hjSettings = { hjid: 845878, hjsv: 6 };
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script');
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
      /* eslint-enable */
    }
  }

  render() {
    return null;
  }
}

export default HotjarProvider;
