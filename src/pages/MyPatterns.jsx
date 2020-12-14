import {
  Container, Grid, makeStyles, Typography,
} from '@material-ui/core';
import PieceCard from 'components/views/Search/PieceCard';
import { getInfo } from 'connection/user';
import { LoggedUserContext } from 'context';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MEDIA_URL } from 'utils/constants';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    marginTop: theme.spacing(5),
  },
  list: {
    marginTop: theme.spacing(3),
    // marginTop: theme.spacing(5),
    maxWidth: '100vw',
    padding: theme.spacing(5),
  },
}));

function MyPatterns() {
  const classes = useStyles();

  const [purchases, setPurchases] = useState([]);
  const [pieces, setPieces] = useState([]);

  const logged = useContext(LoggedUserContext);

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      if (logged) {
        const info = await getInfo(logged.username);

        setPurchases(info.compras);
      }
    }

    fetchData();
  }, [logged]);

  useEffect(() => {
    if (purchases) {
      setPieces(purchases.reduce(
        (acc, purchase) => [...acc, ...purchase.pecas], [],
      ).reduce((acc, piece) => (acc.find((el) => el.id === piece.id)
        ? acc : [...acc, piece]),
      []));
    }
  }, [purchases]);

  return (
    <>
      <div className={classes.title}><Typography variant="h3">Seus moldes</Typography></div>
      <Container className={classes.list}>
        <Grid container spacing={5} justify="space-evenly">
          {pieces.map((piece) => (
            <PieceCard
              piece={piece}
              key={piece.id}
              action={{
                onClick: () => {
                  const downloadUrl = `${MEDIA_URL}/${piece.arquivo}`;

                  const link = document.createElement('a');
                  link.setAttribute('target', '_');
                  link.setAttribute('href', downloadUrl);
                  link.click();
                },
                text: 'Baixar',
              }}
            />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default MyPatterns;
