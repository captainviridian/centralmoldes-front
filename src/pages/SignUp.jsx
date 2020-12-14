import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { Link, useHistory, useLocation } from 'react-router-dom';

import { Field, Form, FormSpy } from 'react-final-form';

import { Typography } from 'components/base';

import { AppForm } from 'components/views';

import { email, required } from 'utils/validation';

import { RFTextField, FormButton, FormFeedback } from 'components/form';

import { postUser } from 'connection/user';
import { CheckoutContext, MessageContext } from 'context';

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
  link: {
    color: 'inherit',
  },
  content: {
    marginTop: theme.spacing(3),
  },
}));

function SignUp() {
  const classes = useStyles();

  const sendMessage = useContext(MessageContext);
  const { item } = useContext(CheckoutContext);

  const history = useHistory();
  const { pathname } = useLocation();

  const isBuyer = pathname.includes('buyer');

  const validate = (values) => {
    const errors = required(['firstName', 'lastName', 'email', 'password', 'cpf'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = async (data) => {
    const {
      firstName, lastName, birthdate, cpf, password, email: userEmail,
    } = data;

    const body = {
      first_name: firstName,
      last_name: lastName,
      username: userEmail,
      email: userEmail,
      nascimento: birthdate || new Date().toISOString().split('T')[0],
      password,
      cpf,
      tipo: isBuyer ? 'buyer' : 'seller',
    };

    const res = await postUser(body);

    if (res) {
      sendMessage('Conta criada! Faça login para continuar.');

      history.push('/sign-in');
    } else {
      sendMessage('Um erro ocorreu. Tente novamente.');
    }
  };

  return (
    <div className={classes.content}>
      <AppForm>
        <>
          {isBuyer ? (
            <>
              <Typography variant="h3" gutterBottom marked="center" align="center">
                Crie sua conta CM
              </Typography>
              <Typography variant="body2" align="center">
                {'Já possui uma conta? '}
                <Link to="sign-in" className={classes.link}>
                  Fazer Login
                </Link>
              </Typography>
              <Typography variant="body2" align="center">
                {'Gostaria de vender os seus moldes? '}
                <Link to="seller-sign-up" className={classes.link}>
                  Cadastre-se aqui
                </Link>
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h3" gutterBottom marked="center" align="center">
                Seja uma estilista parceira
              </Typography>
              <Typography variant="body2" align="center">
                {'Quer saber mais sobre o modelo de parcerias? '}
                <Link to="sell" className={classes.link}>
                  Veja aqui
                </Link>
              </Typography>
            </>
          )}
        </>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: onSubmit, submitting }) => (
            <form onSubmit={onSubmit} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    disabled={submitting}
                    autoComplete="fname"
                    fullWidth
                    label="Nome"
                    name="firstName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting}
                    autoComplete="lname"
                    fullWidth
                    label="Sobrenome"
                    name="lastName"
                    required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    disabled={submitting}
                    fullWidth
                    label="CPF"
                    name="cpf"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    render={(props) => (
                      <RFTextField {...props} />
                    )}
                    disabled={submitting}
                    autoComplete="lname"
                    fullWidth
                    label="Data de nascimento"
                    name="birthdate"
                    type="date"
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting}
                required
                name="password"
                autoComplete="current-password"
                label="Senha"
                type="password"
                margin="normal"
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
                color="secondary"
                fullWidth
              >
                {submitting ? 'Cadastrando...' : 'Cadastrar'}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
    </div>
  );
}

export default SignUp;
