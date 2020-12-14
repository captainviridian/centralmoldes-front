import React, { useContext, useEffect, useState } from 'react';

import { CheckoutContext, LoggedUserContext, MessageContext } from 'context';
import { getPiece } from 'connection/piece';
import {
  Button,
  Card, CardContent, CardHeader, CardMedia, Container, Grid, makeStyles, Typography,
} from '@material-ui/core';
import { MEDIA_URL } from 'utils/constants';
import { useHistory } from 'react-router-dom';
import { postPurchase } from 'connection/transaction';
import storage from 'utils/storage';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(5),
  },
  card: {
    display: 'flex',
    marginBottom: theme.spacing(3),
  },
  emptyText: {
    textAlign: 'center',
  },
  media: {
    height: theme.spacing(18),
    width: theme.spacing(25),
    // paddingLeft: '56.25%', // 16:9
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

function Checkout() {
  const classes = useStyles();

  const { item, setItem } = useContext(CheckoutContext);
  const sendMessage = useContext(MessageContext);

  const loggedUser = useContext(LoggedUserContext);

  const history = useHistory();

  const [piece, setPiece] = useState(null);

  useEffect(() => {
    if (!item) {
      setItem(JSON.parse(storage().getItem('card')));
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (item) {
        const result = await getPiece(item);
        setPiece(result);
      }
    }

    fetchData();
  }, [item]);

  async function handleSubmit() {
    const res = await postPurchase({
      user_id: `${loggedUser.id}`,
      peca_id: [piece.id],
      total: piece.preco,
    });

    if (res) {
      setItem(null);

      history.push('/my-patterns');
      sendMessage('Compra efetuada com sucesso');
    } else {
      sendMessage('Um erro ocorreu');
    }
  }

  return (
    <Container maxWidth="sm" className={classes.content}>
      {item ? (piece && (
        <>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={`${MEDIA_URL}/${piece.foto}`}
            />
            <div className={classes.details}>
              <CardHeader title={`${piece.tipo} ${piece.tamanho}`} />
              <CardContent>
                <Typography variant="subtitle1">{piece.descricao}</Typography>
                <Typography variant="subtitle2">{`R$ ${piece.preco}`}</Typography>
              </CardContent>
            </div>
          </Card>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button onClick={() => setItem(null)} variant="contained">Esvaziar carrinho</Button>
            </Grid>
            <Grid item>
              <Button onClick={handleSubmit} color="primary" variant="contained">Finalizar compra</Button>
            </Grid>
          </Grid>
        </>
      )) : (
        <Typography variant="h4" className={classes.emptyText}>
          Seu carrinho está vazio
        </Typography>
      )}
    </Container>
  );
}

export default Checkout;
