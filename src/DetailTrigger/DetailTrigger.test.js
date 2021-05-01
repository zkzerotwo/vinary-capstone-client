import React from 'react';
import ReactDOM from 'react-dom';
import DetailTrigger from './DetailTrigger';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DetailTrigger />, div);
  ReactDOM.unmountComponentAtNode(div);
});