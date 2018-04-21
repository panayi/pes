import React from 'react';
import { withProps, withState } from 'recompose';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import A from 'components/A/A';
import Truncate from 'components/Truncate/Truncate';
import BreakWord from 'components/BreakWord/BreakWord';
import BaseAdBody from 'components/AdBody/AdBody';

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
    const { ad, expanded, setExpanded } = this.props;

    return (
      <BaseAdBody
        ad={ad}
        component={component}
        lines={!expanded && LINES}
        ellipsis={
          <React.Fragment>
            ...<A onClick={() => setExpanded(true)}>Read more</A>
          </React.Fragment>
        }
      />
    );
  }
}

export default withState('expanded', 'setExpanded', false)(AdBody);
