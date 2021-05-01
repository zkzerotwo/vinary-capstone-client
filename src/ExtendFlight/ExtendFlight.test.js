import React from 'react';
import ReactDOM from 'react-dom';
import ExtendFlight from './ExtendFlight';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExtendFlight />, div);
  ReactDOM.unmountComponentAtNode(div);
});