import React from 'react';
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FacebookShareButton from 'components/FacebookShareButton/FacebookShareButton';
import TwitterShareAdButton from '../../TwitterShareAdButton/TwitterShareAdButton';
import EmailShareAdButton from '../../EmailShareAdButton/EmailShareAdButton';

const ShareAd = ({ ad, location, DialogTitle, DialogContent }) => {
  const path = location.pathname;

  return (
    <React.Fragment>
      <DialogTitle title="Share ad" />
      <DialogContent>
        <List>
          <FacebookShareButton component={ListItem} path={path}>
            <ListItemText primary="Share on Facebook" />
          </FacebookShareButton>
          <TwitterShareAdButton component={ListItem} path={path} ad={ad}>
            <ListItemText primary="Share on Twitter" />
          </TwitterShareAdButton>
          <EmailShareAdButton component={ListItem} path={path} ad={ad}>
            <ListItemText primary="Share via Email" />
          </EmailShareAdButton>
        </List>
      </DialogContent>
    </React.Fragment>
  );
};

export default withRouter(ShareAd);
