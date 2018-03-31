import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import theme from 'config/theme';
import { selectors as responsiveSelectors } from 'store/responsive';

const WidthMatch = ({ fakeWidthBreakpoint, children }) => {
  if (process.browser) {
    return <div>{children}</div>;
  }

  return (
    <div
      className={classNames(
        'WidthMatch--root',
        `WidthMatch--${fakeWidthBreakpoint}`,
      )}
    >
      {children}
      <style
        dangerouslySetInnerHTML={{
          // eslint-disable-line react/no-danger
          __html: `
          .WidthMatch--root {
            display: none;
          }
          ${theme.breakpoints.only('xs')} {
            .WidthMatch--xs {
              display: block;
            }
          }
          ${theme.breakpoints.only('sm')} {
            .WidthMatch--sm {
              display: block;
            }
          }
          ${theme.breakpoints.only('md')} {
            .WidthMatch--md {
              display: block;
            }
          }
          ${theme.breakpoints.only('lg')} {
            .WidthMatch--lg {
              display: block;
            }
          }
          ${theme.breakpoints.only('xl')} {
            .WidthMatch--xl {
              display: block;
            }
          }
        `,
        }}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  fakeWidthBreakpoint: responsiveSelectors.fakeWidthBreakpointSelector,
});

export default R.compose(connect(mapStateToProps))(WidthMatch);
