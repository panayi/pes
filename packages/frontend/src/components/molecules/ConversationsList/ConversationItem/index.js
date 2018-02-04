/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import { connectData } from 'lib/connectData';
import { propSelector } from 'pesposa-utils';
import { models } from 'store/firebase/data';
import { selectors as authSelectors } from 'store/firebase/auth';
import { selectors as imagesSelectors } from 'store/images';
import Link from 'components/atoms/Link';
import AdTitle from 'components/atoms/AdTitle';
import AdBody from 'components/atoms/AdBody';
import AdDate from 'components/atoms/AdDate';
import ProfileImage from 'components/atoms/ProfileImage';

type Props = {
  conversation: Object,
  ad: Ad,
  adThumbnail: Object,
  otherUserId: string,
  classes: Object,
};

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.unit,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  active: {
    background: '#f5f0f0',
  },
  adThumbnailWrap: {
    display: 'flex',
    flex: '0 0 50px',
    height: '50px',
    overflow: 'hidden',
  },
  adThumbnail: {
    height: '200%',
  },
  info: {
    paddingLeft: theme.spacing.unit,
  },
  profileImageWrap: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
  },
});

const ConversationItem = ({
  conversation,
  ad,
  adThumbnail,
  otherUserId,
  classes,
}: Props) => (
  <Link
    className={classes.root}
    activeClassName={classes.active}
    to={`/messages/${conversation.ad}/${conversation.buyer}`}
  >
    <div className={classes.adThumbnailWrap}>
      {adThumbnail && (
        <img
          className={classes.adThumbnail}
          src={adThumbnail.url}
          alt={ad.title}
        />
      )}
    </div>
    <div className={classes.info}>
      <AdTitle ad={ad} />
      <AdBody type="caption" ad={ad} />
      <AdDate type="caption" ad={ad} />
    </div>
    <div className={classes.profileImageWrap}>
      {otherUserId && <ProfileImage userId={otherUserId} />}
    </div>
  </Link>
);

const mapDataToProps = {
  ad: models.ads.one(propSelector(['conversation', 'ad'])),
};

const mapStateToProps = createStructuredSelector({
  uid: authSelectors.uidSelector,
});

export default R.compose(
  connectData(mapDataToProps, mapStateToProps),
  withProps(
    createStructuredSelector({
      otherUserId: R.ifElse(
        R.converge(R.equals, [
          R.path(['conversation', 'buyer']),
          R.prop('uid'),
        ]),
        R.path(['ad', 'user']),
        R.path(['conversation', 'buyer']),
      ),
      adThumbnail: imagesSelectors.adThumbnailSelector,
    }),
  ),
  withStyles(styles),
)(ConversationItem);
