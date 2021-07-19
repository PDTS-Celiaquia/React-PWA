import React, { lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from '../components/common/NavBar';
const Cuestionario = lazy(() => import('../components/Cuestionario'));
const LoginPage = lazy(() => import('../components/auth/LoginPage'));
const RegisterPage = lazy(() => import('../components/auth/RegisterPage'));

function MainRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/cuestionario" component={Cuestionario} />
      </Switch>
    </BrowserRouter>
  );
}

export default MainRouter;
