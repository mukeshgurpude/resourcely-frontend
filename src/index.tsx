import React from 'react';
import ReactDOM from 'react-dom';
import { MantineProvider } from '@mantine/core';
// import './index.scss';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider withNormalizeCSS withGlobalStyles theme={{colorScheme: 'dark'}}>
      <App/>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
reportWebVitals();
