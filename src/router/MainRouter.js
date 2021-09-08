import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/auth/PrivateRoute';
import Loader from '../components/common/Loader';
import NavBar from '../components/nav/NavBar';

const HomePage = lazy(() => import('../components/HomePage'));
const LoginPage = lazy(() => import('../components/auth/LoginPage'));
const RegisterPage = lazy(() => import('../components/auth/RegisterPage'));
const Cuestionario = lazy(() => import('../components/Cuestionario'));
const ModifyPasswordPage = lazy(() => import('../components/auth/ModifyPasswordPage'))
const ListaRecetas = lazy(() => import('../components/recetas/ListaRecetas'))
const RecetaView = lazy(() => import('../components/recetas/RecetaView'))

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
          <PrivateRoute exact path="/modifyPassword" component={ModifyPasswordPage} />
          <PrivateRoute exact path="/receta" component={ListaRecetas} />
          <PrivateRoute exact path="/receta/:id" component={RecetaView} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default MainRouter;
