import React from 'react';
import ReactDOM from 'react-dom';
import NewFlight from './NewFlight';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewFlight />, div);
  ReactDOM.unmountComponentAtNode(div);
});