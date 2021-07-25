import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loader from '../components/common/Loader';
import NavBar from '../components/nav/NavBar';

const HomePage = lazy(() => import('../components/HomePage'));
const LoginPage = lazy(() => import('../components/auth/LoginPage'));
const RegisterPage = lazy(() => import('../components/auth/RegisterPage'));
const Cuestionario = lazy(() => import('../components/Cuestionario'));

function MainRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <PrivateRoute exact path="/cuestionario" component={Cuestionario} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default MainRouter;
