import React, { useState, useEffect } from 'react';

import Filters from 'components/views/Search/Filters';
import { getPieces } from 'connection/piece';
import {
  Container, Grid, makeStyles,
} from '@material-ui/core';
import PieceCard from 'components/views/Search/PieceCard';

const useStyles = makeStyles((theme) => ({
  list: {
    position: 'absolute',
    top: 2 * theme.spacing.headerSize,
    // marginTop: theme.spacing(5),
    maxWidth: '100vw',
    padding: theme.spacing(5),
  },
}));

function Search() {
  const classes = useStyles();

  const [allPieces, setAllPieces] = useState([]);
  const [pieces, setPieces] = useState([]);

  const [filterOptions, setFilterOptions] = useState({
    types: [],
    sizes: [],
    tags: [],
  });

  const [appliedOptions, setAppliedOptions] = useState({
    types: [],
    sizes: [],
    tags: [],
  });

  const applyOption = (optionName) => (toApply) => {
    setAppliedOptions({
      ...appliedOptions,
      [optionName]: toApply,
    });
  };

  const optionFilters = {
    types: (selected) => (el) => selected.includes(el.tipo),
    sizes: (selected) => (el) => selected.includes(el.tamanho),
    tags: (selected) => (el) => el.tags.filter((tag) => selected.includes(tag)).length > 0,
  };

  useEffect(() => {
    async function fetchPieces() {
      const res = await getPieces();

      setAllPieces(res);
      setPieces(res);
    }

    fetchPieces();
  }, []);

  useEffect(() => {
    setFilterOptions({
      ...filterOptions,
      types: [...new Set(allPieces.map((piece) => piece.tipo))],
      sizes: [...new Set(allPieces.map((piece) => piece.tamanho))],
      tags: [...new Set(allPieces.reduce((acc, piece) => [...acc, ...piece.tags], []))],
    });
  }, [allPieces]);

  useEffect(() => {
    const filteredPieces = Object.entries(appliedOptions).reduce((acc, [key, value]) => (
      value.length > 0 ? acc.filter(optionFilters[key](value)) : acc
    ), allPieces);

    setPieces(filteredPieces);
  }, [appliedOptions]);

  return (
    <>
      <Filters
        filters={[{
          name: 'Tipo', options: filterOptions.types, showOption: (text) => text, apply: applyOption('types'),
        }, {
          name: 'Tamanho', options: filterOptions.sizes, showOption: (text) => text, apply: applyOption('sizes'),
        }, {
          name: 'Tags', options: filterOptions.tags, showOption: (text) => `#${text}`, apply: applyOption('tags'),
        }]}
      />
      <Container className={classes.list}>
        <Grid container spacing={5} justify="space-evenly">
          {pieces.map((piece) => (
            <PieceCard
              piece={piece}
              key={piece.id}
            />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Search;
