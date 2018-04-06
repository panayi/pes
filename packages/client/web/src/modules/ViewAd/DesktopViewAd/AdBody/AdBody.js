import React from 'react';
import { withProps } from 'recompose';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import Truncate from '@pesposa/client-core/src/components/Truncate/Truncate';
import BaseAdBody from '@pesposa/client-core/src/modules/Ad/AdBody/AdBody';
import BreakWord from 'components/BreakWord/BreakWord';

const LINES = 6;

const component = withProps({
  component: Truncate,
})(BreakWord);

class AdBody extends React.Component {
  componentDidUpdate(prevProps) {
    if (propsChanged(['adId'], prevProps, this.props)) {
      this.props.setExpanded(false);
    }
  }

  render() {
    const { ad } = this.props;

    return (
      <BaseAdBody
        ad={ad}
        component={component}
        lines={LINES}
        ellipsis="..."
        showMoreText="Read more"
      />
    );
  }
}

export default AdBody;
