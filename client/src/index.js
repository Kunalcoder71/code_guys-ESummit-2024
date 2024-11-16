import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Suppress ResizeObserver loop limit errors
const resizeObserverErr = window.ResizeObserver.prototype.observe;
window.ResizeObserver.prototype.observe = function() {
  try {
    resizeObserverErr.apply(this, arguments);
  } catch (e) {
    console.warn('ResizeObserver loop error suppressed');
  }
};


ReactDOM.render(<App />, document.getElementById('root'));

// Suppress ResizeObserver loop limit errors
