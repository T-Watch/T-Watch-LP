import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
