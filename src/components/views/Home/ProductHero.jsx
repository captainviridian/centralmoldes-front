import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import Typography from 'components/base/Typography';

import backgroundImage from 'assets/hero-banner.jpg';

import { CallToAction } from 'components/Home';
import ProductHeroLayout from './ProductHeroLayout';

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    fontSize: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
      fontSize: theme.spacing(2.5),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function ProductHero({ classes }) {
  const big = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant={big ? 'h2' : 'h3'} marked="center">
        Encontre seu estilo
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        {'Escolha entre dezenas de moldes exclusivos pelos melhores preços '}
        e atendimento exclusivo CentralMoldes
      </Typography>
      <CallToAction text="Buscar moldes" to="buy" />
      <Typography variant="body2" color="inherit" className={classes.more}>
        Ou veja abaixo para saber mais
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.objectOf(
    PropTypes.string,
  ).isRequired,
};

export default withStyles(styles)(ProductHero);
