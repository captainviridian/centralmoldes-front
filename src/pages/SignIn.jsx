import React, { useContext } from 'react';

import { Field, Form, FormSpy } from 'react-final-form';

import { makeStyles } from '@material-ui/core/styles';

import { Link, useHistory } from 'react-router-dom';

import { Typography } from 'components/base';

import { AppForm } from 'components/views';

import { email, required } from 'utils/validation';

import {
  RFTextField, FormButton, FormFeedback, Checkbox,
} from 'components/form';
import { postLogin } from 'connection/user';
import { MessageContext } from 'context';
import getStorage, { setLocal } from 'utils/storage';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(3),
  },
  link: {
    color: 'inherit',
  },
}));

function doLogin(user) {
  getStorage().setItem('loggedUser', JSON.stringify(user));
}

function SignIn() {
  const classes = useStyles();

  const sendMessage = useContext(MessageContext);

  const history = useHistory();

  const validate = (values) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = async ({ email: username, password, keepSignedIn }) => {
    const body = {
      username, password,
    };

    const res = await postLogin(body);

    if (res) {
      if (keepSignedIn) setLocal();

      doLogin(res);
      history.push('/');
    } else {
      sendMessage('Um erro ocorreu. Tente novamente.');
    }
  };

  return (
    <div className={classes.content}>
      <AppForm>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Bem-vindo a CM
          </Typography>
          <Typography variant="body2" align="center">
            {'Ainda não tem uma conta? '}
            <Link to="buyer-sign-up" className={classes.link}>
              Cadastre-se aqui
            </Link>
          </Typography>
        </>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: onSubmit, submitting }) => (
            <form onSubmit={onSubmit} className={classes.form} noValidate>
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting}
                required
                name="password"
                autoComplete="current-password"
                label="Senha"
                type="password"
                margin="normal"
              />
              <Field
                render={({ input }) => (
                  <Checkbox label="Continuar conectado" {...input} />
                )}
                disabled={submitting}
                name="keepSignedIn"
                type="checkbox"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) => (submitError ? (
                  <FormFeedback className={classes.feedback} error>
                    {submitError}
                  </FormFeedback>
                ) : null)}
              </FormSpy>
              <FormButton
                className={classes.button}
                disabled={submitting}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting ? 'Entrando...' : 'Entrar'}
              </FormButton>
            </form>
          )}
        </Form>
        <Typography variant="body2" align="center">
          <Link to="forgot-password" className={classes.link}>
            Esqueci minha senha
          </Link>
        </Typography>
      </AppForm>
    </div>
  );
}

export default SignIn;
