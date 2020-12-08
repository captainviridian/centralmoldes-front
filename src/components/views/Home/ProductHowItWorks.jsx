import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from 'components/base/Typography';

import productCurvyLines from 'assets/productCurvyLines.png';

import { CallToAction } from 'components/Home';

import {
  ShoppingCartOutlined as CartIcon,
  CloudDownloadOutlined as DonwloadIcon,
  CheckCircleOutlineOutlined as CheckIcon,
} from '@material-ui/icons';

const styles = (theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  callToAction: {
    marginTop: theme.spacing(8),
  },
});

const steps = [
  {
    Icon: CartIcon,
    text: 'Escolha os moldes para sua nova roupa.',
  },
  {
    Icon: DonwloadIcon,
    text: 'Você recebe acesso ao download do molde. Pode baixar quantas vezes quiser.',
  },
  {
    Icon: CheckIcon,
    text: 'Use o molde para costurar a peça você mesma, ou entre em contato com uma de nossas costureiras parceiras!',
  },
];

function ProductHowItWorks(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src={productCurvyLines}
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          Como funciona
        </Typography>
        <div>
          <Grid container spacing={5}>
            {steps.map(({ Icon, text }, index) => (
              <Grid key={text} item xs={12} md={4}>
                <div className={classes.item}>
                  <div className={classes.number}>
                    {index + 1}
                    .
                  </div>
                  <Icon className={classes.icon} fontSize="large" />
                  <Typography variant="h5" align="center">
                    {text}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
        <CallToAction className={classes.callToAction} text="Comece agora" to="buy" />
      </Container>
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.objectOf(
    PropTypes.string,
  ).isRequired,
};

export default withStyles(styles)(ProductHowItWorks);
