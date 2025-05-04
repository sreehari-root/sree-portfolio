import './utils/polyfills';
import React, { useEffect } from 'react';
import App from './App';

export default function AppInit() {
  useEffect(() => {
    // Initialize polyfills and global objects
    console.log('Initializing app with polyfills');
  }, []);

  return <App />;
}