import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Register';
import { BrowserRouter as Router } from 'react-router-dom';
// import shallow from


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router>
        <Register />
    </Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});