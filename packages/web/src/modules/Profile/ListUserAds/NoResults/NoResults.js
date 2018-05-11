import React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import EmptyHero from 'components/EmptyHero/EmptyHero';
import ShowCreateAdButton from 'modules/PostAd/ShowCreateAdButton/ShowCreateAdButton';
import UserFullName from 'components/UserFullName/UserFullName';

const styles = theme => ({
  sellButton: {
    marginTop: theme.spacing.unit,
  },
});

const NoResults = ({ sold, isCurrentUser, userId, classes }) => {
  if (sold) {
    const fullname = isCurrentUser ? (
      "You haven't"
    ) : (
      <span>
        <UserFullName userId={userId} /> has not
      </span>
    );

    return <EmptyHero tagline={<span>{fullname} sold anything yet</span>} />;
  }

  const fullname = isCurrentUser ? (
    'You are'
  ) : (
    <span>
      <UserFullName userId={userId} /> is
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
