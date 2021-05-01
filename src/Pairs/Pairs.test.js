import React from 'react';
import ReactDOM from 'react-dom';
import Pairs from './Pairs';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Pairs /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});