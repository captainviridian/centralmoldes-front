import React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';

import { makeStyles } from '@material-ui/core/styles';

import Typography from 'components/base/Typography';

import AppForm from 'components/views/AppForm';
import { email, required } from 'utils/validation';

import { RFTextField, FormButton, FormFeedback } from 'components/form';

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
}));

function ForgotPassword() {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(['email'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <>
      <AppForm>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Esqueceu sua senha?
          </Typography>
          <Typography variant="body2" align="center">
            Digite seu email abaixo e enviaremos um link para criar uma nova senha
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
                autoFocus
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
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
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'Em progresso...' : 'Enviar link'}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
    </>
  );
}

export default ForgotPassword;
