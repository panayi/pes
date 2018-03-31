import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import theme from 'config/theme';
import { selectors as responsiveSelectors } from 'store/responsive';

const WidthMatch = ({ fakeWidthBreakpoint, children }) => (
  <div
    className={
      process.browser
        ? ''
        : classNames('WidthMatch--root', `WidthMatch--${fakeWidthBreakpoint}`)
    }
  >
    {children}
    <style
      /* eslint-disable react/no-danger */
      dangerouslySetInnerHTML={{
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
      /* eslint-disable react/no-danger */
    />
  </div>
);

const mapStateToProps = createStructuredSelector({
  fakeWidthBreakpoint: responsiveSelectors.fakeWidthBreakpointSelector,
});

export default connect(mapStateToProps)(WidthMatch);
