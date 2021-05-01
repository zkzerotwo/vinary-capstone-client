import React from 'react';
import ReactDOM from 'react-dom';
import Flight from './Flight';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Flight />, div);
  ReactDOM.unmountComponentAtNode(div);
});