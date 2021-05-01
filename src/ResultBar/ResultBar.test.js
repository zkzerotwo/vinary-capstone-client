import React from 'react';
import ReactDOM from 'react-dom';
import ResultBar from './ResultBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResultBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});