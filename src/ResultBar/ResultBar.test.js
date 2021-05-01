import React from 'react';
import ReactDOM from 'react-dom';
import ResultBar from './ResultBar';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><ResultBar /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});