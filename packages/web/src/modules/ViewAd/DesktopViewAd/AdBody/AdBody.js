import React from 'react';
import { withState } from 'recompose';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import A from 'components/A/A';
import Truncate from 'components/Truncate/Truncate';
import BaseAdBody from 'components/AdBody/AdBody';

const LINES = 6;

class AdBody extends React.Component {
  componentDidUpdate(prevProps) {
    if (propsChanged(['adId'], prevProps, this.props)) {
      this.props.setExpanded(false);
    }
  }

  render() {
    const { ad, expanded, setExpanded } = this.props;

    return (
      <div>
        <BaseAdBody
          ad={ad}
          component={Truncate}
          lines={!expanded && LINES}
          ellipsis={
            <span>
              ...<A onClick={() => setExpanded(true)}>Read more</A>
            </span>
          }
          onTruncate={this.handleTruncate}
        />
      </div>
    );
  }
}

export default withState('expanded', 'setExpanded', false)(AdBody);
