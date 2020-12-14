import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import {
  Button,
  Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Grid, makeStyles, Typography,
} from '@material-ui/core';
import { MEDIA_URL } from 'utils/constants';
import { CheckoutContext, LoggedUserContext, MessageContext } from 'context';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  item: {
    maxWidth: theme.breakpoints.values.sm / 2,
  },
  link: {
    textDecoration: 'none',
    '&:link': {
      color: 'inherit',
    },
    '&:visited': {
      color: 'inherit',
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

function PieceCard({
  piece: {
    tamanho,
    tipo,
    preco,
    tags,
    foto,
    id,
  },
}) {
  const classes = useStyles();

  const { setItem } = useContext(CheckoutContext);
  const isLogged = !!useContext(LoggedUserContext);

  const sendMessage = useContext(MessageContext);

  const history = useHistory();

  function handleClickBuy() {
    setItem(id);

    if (isLogged) history.push('/checkout');
    else {
      sendMessage('Faça seu cadastro para continuar');
      history.push('/buyer-sign-up');
    }
  }

  return (
    <Grid item xs={12} sm={6} md={3} className={classes.item}>
      <Card raised className={classes.card}>
        <CardMedia
          image={`${MEDIA_URL}/${foto}`}
          className={classes.media}
        />
        <CardHeader title={`${tipo} ${tamanho}`} />
        <CardContent>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography variant="subtitle2">{`R$ ${preco.replace('.', ',')}`}</Typography>
            </Grid>
            <Grid item container spacing={1}>
              {tags.map((tag) => (
                <Grid key={tag} item>
                  <Chip color="secondary" label={`#${tag}`} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button>Saiba mais</Button>
          <Button onClick={handleClickBuy} variant="outlined">Comprar</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

PieceCard.propTypes = {
  piece: PropTypes.shape({
    tamanho: PropTypes.string,
    tipo: PropTypes.string,
    preco: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    foto: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default PieceCard;
