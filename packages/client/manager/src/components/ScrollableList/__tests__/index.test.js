import React from 'react';
import Panel from '../../Panel/Panel';
import ScrollableListHoc from '..';

describe('ScrollableList', () => {
  describe('Index', () => {
    it('should render properly', () => {
      const Component = shallow(<ScrollableListHoc />);

      expect(Component).toMatchSnapshot();
    });

    it('should pass extra props to the panel', () => {
      const someExtraProps = {
        header: <div className="header">header</div>,
      };
      const children = <div className="children">children</div>;
      const Component = mount(
        <ScrollableListHoc fullWidth {...someExtraProps}>
          {children}
        </ScrollableListHoc>,
      );
      const allExtraProps = { ...someExtraProps, children };

      expect(Component.find(Panel).props()).toEqual(allExtraProps);
    });
  });
});
