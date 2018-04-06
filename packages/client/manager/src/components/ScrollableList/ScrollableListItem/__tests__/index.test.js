import React from 'react';
import { withRouter } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import Link from '@pesposa/client-core/src/components/Link/Link';
import ScrollableListItemHoc, { ScrollableListItem } from '..';

const mockStore = {
  router: {
    location: {
      pathname: 'test_path',
      search: 'test_search',
      hash: 'test_hash',
      key: 'test_key',
    },
  },
};

describe('ScrollableList', () => {
  describe('Item', () => {
    it('should render properly', () => {
      const wrapper = withMockStore(<ScrollableListItemHoc />, mockStore);
      const Component = shallow(wrapper.component);

      expect(Component).toMatchSnapshot();
    });

    it('should render as active iff this links to the current path', () => {
      const wrapperActive = withRouter(
        withMockStore(<ScrollableListItemHoc to="test_path" />, mockStore)
          .component,
      );
      const ComponentActive = mount(wrapperActive);

      const wrapperInActive = withRouter(
        withMockStore(<ScrollableListItemHoc to="other_path" />, mockStore)
          .component,
      );
      const ComponentInActive = mount(wrapperInActive);

      expect(ComponentActive.find(ScrollableListItem).prop('isActive')).toEqual(
        true,
      );
      expect(
        ComponentInActive.find(ScrollableListItem).prop('isActive'),
      ).toEqual(false);
    });

    it('should render primary & secondary texts somewhere', () => {
      const textPrimary = 'test_primary';
      const textSecondary = 'test_secondary';
      const wrapper = withMockStore(
        <ScrollableListItemHoc
          primary={textPrimary}
          secondary={textSecondary}
        />,
        mockStore,
      );
      const Component = mount(wrapper.component);

      expect(Component.text()).toContain(textPrimary);
      expect(Component.text()).toContain(textSecondary);
    });

    it('should render icon somewhere', () => {
      const iconClassName = 'testIcon';
      const icon = <span className={iconClassName} />;
      const wrapper = withMockStore(
        <ScrollableListItemHoc icon={icon} />,
        mockStore,
      );
      const Component = mount(wrapper.component);

      expect(Component.find(`.${iconClassName}`).length).not.toEqual(0);
    });

    it('should render a `ListItemSecondaryAction` iff `action` is passed', () => {
      const actionClassName = 'testAction';
      const action = <span className={actionClassName} />;
      const wrapper = withMockStore(
        <ScrollableListItemHoc action={action} />,
        mockStore,
      );
      const Component = mount(wrapper.component);

      expect(Component.find(`.${actionClassName}`).length).not.toEqual(0);
    });

    it('should pass className & style props to the ListItem root', () => {
      const className = 'testClass';
      const style = {
        border: 'none',
        color: 'inherit',
      };
      const wrapper = withMockStore(
        <ScrollableListItemHoc className={className} style={style} />,
        mockStore,
      );
      const Item = mount(wrapper.component).find(`.${className}`);

      expect(Item.length).not.toEqual(0);
      expect(Item.first().prop('style')).toEqual(style);
    });

    it('should render as a Link if `to` prop is passed', () => {
      const wrapper = withRouter(
        withMockStore(<ScrollableListItemHoc to="some_url" />, mockStore)
          .component,
      );
      const Component = mount(wrapper);

      expect(Component.find(ListItem).prop('component')).toEqual(Link);
    });

    it('should handle the passed `onClick` function', () => {
      const onClickSpy = jest.fn();
      const wrapper = withMockStore(
        <ScrollableListItemHoc onClick={onClickSpy} />,
        mockStore,
      );
      const Component = mount(wrapper.component);

      expect(onClickSpy.mock.calls.length).toEqual(0);

      Component.find(ListItem).simulate('click');

      expect(onClickSpy.mock.calls.length).toEqual(1);
    });
  });
});
