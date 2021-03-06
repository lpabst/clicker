
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/Login/Login.js';
import Home from './components/Home/Home.js';


export default (
    <Switch>
        
        <Route component={ Login } path='/' exact />
        <Route component={ Home } path='/home' exact />

    </Switch>
)
