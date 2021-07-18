import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from '../components/common/NavBar';
import Cuestionario from '../components/Cuestionario';
import LoginPage from '../components/LoginPage';

function MainRouter() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={NavBar} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/cuestionario" component={Cuestionario} />
      </div>
    </BrowserRouter>
  );
}

export default MainRouter;
