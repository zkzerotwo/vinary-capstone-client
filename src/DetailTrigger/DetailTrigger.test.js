import React from 'react';
import ReactDOM from 'react-dom';
import DetailTrigger from './DetailTrigger';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><DetailTrigger /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});