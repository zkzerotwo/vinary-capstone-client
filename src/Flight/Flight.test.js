import React from 'react';
import ReactDOM from 'react-dom';
import Flight from './Flight';
// import { jest } from 'jest'
import { BrowserRouter as Router } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Flight /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
