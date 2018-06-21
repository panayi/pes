import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import EmptyHero from '@pesposa/client-core/src/components/EmptyHero/EmptyHero';
import UserName from '@pesposa/client-core/src/modules/User/UserName/UserName';
import ShowCreateAdButton from 'modules/PostAd/ShowCreateAdButton/ShowCreateAdButton';

const styles = theme => ({
  sellButton: {
    marginTop: theme.spacing.unit,
  },
});

const NoResults = ({ sold, isCurrentUser, userId, userType, classes }) => {
  if (sold) {
    const fullname = isCurrentUser ? (
      "You haven't"
    ) : (
      <span>
        <UserName userId={userId} userType={userType} defaultName="User" /> has
        not
      </span>
    );

    return <EmptyHero tagline={<span>{fullname} sold anything yet</span>} />;
  }

  const fullname = isCurrentUser ? (
    'You are'
  ) : (
    <span>
      <UserName userId={userId} defaultName="User" /> is
    </span>
  );

  return (
    <EmptyHero
      tagline={<span>{fullname} not selling anything at the moment</span>}
    >
      {isCurrentUser && (
        <ShowCreateAdButton variant="flat" className={classes.sellButton} />
      )}
    </EmptyHero>
  );
};

export default withStyles(styles)(NoResults);
