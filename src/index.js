import React from 'react';
import ReactDOM from 'react-dom';

import './styles/styles.scss';  // instalamos SASS ** npm install node-sass **
import { JournalApp } from './JournalApp';

ReactDOM.render(
    <JournalApp />,
  document.getElementById('root')
);

