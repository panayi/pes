import React from 'react';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';

const styles = theme => ({
  section: {
    marginBottom: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 1.5,
    overflow: 'visible',

    [theme.breakpoints.up(theme.map.laptop)]: {
      paddingBottom: 0,
      border: [1, 'solid', theme.palette.divider],
      borderRadius: theme.borderRadius.md,
    },
  },
  sectionContent: {
    [theme.breakpoints.down(theme.map.tablet)]: {
      padding: [theme.spacing.unit * 2, 0, theme.spacing.unit, 0, '!important'],
    },
  },
  sectionTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: theme.spacing.unit,
    fontWeight: theme.typography.fontWeightBold,
  },
  clearButton: {
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const Filter = ({ title, filterComponent: FilterComponent, classes }) => (
  <FilterComponent>
    {({ render, hasValue, reset }) => (
      <Card className={classes.section} elevation={0}>
        <CardContent className={classes.sectionContent}>
          <div className={classes.sectionTitle}>
            <Typography className={classes.title}>{title}</Typography>
            {hasValue && (
              <Typography
                onClick={() => reset()}
                component="a"
                role="button"
                tabIndex="0"
                className={classes.clearButton}
                size="small"
              >
                Clear
              </Typography>
            )}
          </div>
          {render()}
        </CardContent>
      </Card>
    )}
  </FilterComponent>
);

export default withStyles(styles)(Filter);
