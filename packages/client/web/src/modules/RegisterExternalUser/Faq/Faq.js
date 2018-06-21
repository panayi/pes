import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import A from '@pesposa/client-core/src/components/A/A';
import Question from './Question/Question';

const styles = {
  link: {
    display: 'inline',
    fontSize: 'inherit',
  },
};

const SimpleExpansionPanel = props => {
  const { onSignUpClick, onDeleteAdsClick, onContactClick, classes } = props;
  return (
    <React.Fragment>
      <Grid container spacing={16}>
        <Grid item lg={6} md={12}>
          <Question
            question="I didn't post this ad, who did?"
            answer="Your ad was automatically discovered on the web and posted on Pesposa."
          />
          <Question
            question="Can I make changes to my ads?"
            answer={
              <span>
                Of course! Click the{' '}
                <A className={classes.link} onClick={onSignUpClick}>
                  Sign up
                </A>{' '}
                button above. Once you sign up successfully, you take full
                control of your ads.
              </span>
            }
          />
          <Question
            question="Why do I need to sign up?"
            answer="By creating a Pesposa account you will be able to receive messages and respond to potential buyers."
          />
          <Question
            question="How do I remove my ads?"
            answer={
              <span>
                If for any reason you want to remove your ads from Pesposa,{' '}
                <A className={classes.link} onClick={onDeleteAdsClick}>
                  click here
                </A>.
              </span>
            }
          />
        </Grid>
        <Grid item lg={6} md={12}>
          <Question
            question="What is Pesposa?"
            answer="Pesposa is an online community for buying and selling locally. Pesposa is focused on a single goal: to provide you with the simplest and most trusted tool for exchanging products and services with other people in your area."
          />
          <Question
            question="Why sell on Pesposa?"
            answer="By selling on Pesposa you reach thousands of potential buyers. Pesposa makes it very easy for buyers to find what they need. For you, as a seller, it means you sell your items faster and earn money."
          />
          <Question
            question="How do I increase my chances of selling?"
            answer="Sign up to Pesposa so that you can edit your ads. Add clear and well-lit photos of your items. Use relevant keywords in your description, such as brand and model. Make sure the price is right. Finally, share your ad on Facebook."
          />
          <Question
            question="How do I contact Pesposa?"
            answer={
              <span>
                For any additional question you might have,{' '}
                <A className={classes.link} onClick={onContactClick}>
                  click here
                </A>{' '}
                to contact us.
              </span>
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
