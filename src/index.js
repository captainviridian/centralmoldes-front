/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@material-ui/core/styles';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import theme from './theme';

import { Template } from './components';
import {
  SignIn,
  SignUp,
  Home,
  ForgotPassword,
  Search,
  Checkout,
  Logout,
} from './pages';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Template>
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/sign-in"><SignIn /></Route>
          <Route path="/buyer-sign-up"><SignUp /></Route>
          <Route path="/seller-sign-up"><SignUp /></Route>
          <Route path="/forgot-password"><ForgotPassword /></Route>
          <Route path="/logout"><Logout /></Route>
          <Route path="/buy"><Search /></Route>
          <Route path="/checkout"><Checkout /></Route>
        </Switch>
      </Template>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root'),
);
