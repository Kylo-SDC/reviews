import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import App from '../client/App.jsx';
import Reviews from '../client/Reviews.jsx';
import Toolbar from '../client/Toolbar.jsx';

describe('App', () => {
  test('App renders correctly with a snapshot', () => {
    const tree = renderer
      .create(<App />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  const wrapper = mount(<App />);

  it('App renders Reviews', () => {
    expect(wrapper.find(Reviews).length).toEqual(1);
  });

  it('App renders Toolbar', () => {
    expect(wrapper.find(Toolbar).length).toEqual(1);
  });

});
