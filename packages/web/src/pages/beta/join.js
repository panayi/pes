import React from 'react';
import * as R from 'ramda';
import { setStatic } from 'recompose';
import { Helmet } from 'react-helmet';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import env from '@pesposa/core/src/config/env';
import getMetaTags from 'utils/getMetaTags';
import Beta from './Beta/Beta';
import WaitlistedJoinButton from './Waitlisted/WaitlistedJoinButton/WaitlistedJoinButton';

// BETA

const styles = theme => ({
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    [theme.breakpoints.down(theme.map.phone)]: {
      flex: 'none',
    },
  },
  title: {
    fontSize: '2em',
  },
  body: {
    marginBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    [theme.breakpoints.up(theme.map.tablet)]: {
      marginBottom: theme.spacing.unit * 2.5,
      fontSize: '1.3em',
      lineHeight: '1.7em',
    },
  },
  name: {
    display: 'block',
    marginBottom: theme.spacing.unit * 2,
  },
  buttonWrap: {
    marginBottom: theme.spacing.unit * 4,
    [theme.breakpoints.down(theme.map.phone)]: {
      marginBottom: theme.spacing.unit * 2,
    },
  },
  button: {
    width: 350,
    maxWidth: '80vw',
    minHeight: 52,
    fontSize: '1.25rem',
  },
  fade: {
    opacity: 0.8,
  },
});

class Join extends React.Component {
  componentDidMount() {
    if (env.firebaseProject === 'pesposa-production') {
      /* eslint-disable */
      // Facebook pixel tracking code
      !(function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js',
      );
      fbq('init', '423541348091230');
      fbq('track', 'PageView');
      /* eslint-enable */
    }
  }

  renderContent() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.item}>
          <div className={classes.buttonWrap}>
            <WaitlistedJoinButton
              className={classes.button}
              size="large"
              color="primary"
              variant="raised"
              fullWidth
            >
              Join the waiting list
            </WaitlistedJoinButton>
          </div>
          <Typography className={classes.body} color="inherit">
            <strong className={classes.name} style={{ marginBottom: 0 }}>
              The all new Pesposa is launching soon.
            </strong>
            <span className={classes.fade}>
              Join the waitlist to become one of the earliest users of the new
              Pesposa!
            </span>
          </Typography>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Beta>
        <Helmet
          {...getMetaTags({
            path: this.props.location.pathname,
            title: `The new Pesposa is launching soon. Join the waitlist!`,
            description:
              'People are selling stuff on Pesposa. Join the waitlist to become one of the earliest users of the new Pesposa!',
          })}
        />
        {this.renderContent()}
      </Beta>
    );
  }
}

export default R.compose(
  setStatic('getInitialProps', async ({ store }) => store.getState()),
  withStyles(styles),
)(Join);
