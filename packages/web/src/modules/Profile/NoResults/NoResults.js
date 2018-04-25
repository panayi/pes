import React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import EmptyHero from 'components/EmptyHero/EmptyHero';
import ShowCreateAdButton from 'components/ShowCreateAdButton/ShowCreateAdButton';
import UserFullName from 'components/UserFullName/UserFullName';

const styles = theme => ({
  sellButton: {
    marginTop: theme.spacing.unit,
  },
});

const NoResults = ({ tab, isCurrentUser, userId, classes }) => {
  if (tab === 'pending' && isCurrentUser) {
    return (
      <EmptyHero tagline="You have no listings that are pending publish" />
    );
  }

  if (tab === 'selling') {
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
  }

  if (tab === 'sold') {
    const fullname = isCurrentUser ? (
      "You haven't"
    ) : (
      <span>
        <UserFullName userId={userId} /> has not
      </span>
    );

    return <EmptyHero tagline={<span>{fullname} sold anything yet</span>} />;
  }

  if (tab === 'favorites' && isCurrentUser) {
    return <EmptyHero tagline="You haven't favorited anything yet" />;
  }

  return <EmptyHero tagline="No listings yet!" />;
};

export default withStyles(styles)(NoResults);
