import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import JuicyAds from '../../../../components/JuicyAd/JuicyAd';
import BaseCard from '../BaseCard/BaseCard';
import * as constants from '../../constants';

const mapPaidAdTypeToComponent = {
  juicyAds: JuicyAds,
};

const styles = () => ({
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: [constants.PAID_AD_VERTICAL_PADDING, 0, '!important'],
  },
});

const PaidAdCard = ({ style, hit, classes }) => {
  const { type } = hit;
  const PaidAdComponent = mapPaidAdTypeToComponent[type];

  return (
    <div style={style}>
      <BaseCard>
        <CardContent
          style={{ height: style.height }}
          className={classes.content}
        >
          <PaidAdComponent {...hit} />
        </CardContent>
      </BaseCard>
    </div>
  );
};

export default withStyles(styles)(PaidAdCard);
