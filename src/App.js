import React, {Fragment} from 'react';
import './App.scss';
import {AppRouter} from './app-router';
import {menuItems} from './components/menu-items';
import {AppMenu} from './components/menu';

function App() {
  return (
    <Fragment>
        <AppMenu menuItems={menuItems} />
        <AppRouter />
    </Fragment>
  );
}

export default App;
