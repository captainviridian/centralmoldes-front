/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';

import {
  ProductSmokingHero,
  ProductHero,
  ProductHowItWorks,
  ProductCTA,
} from 'components/views/Home';

import { LoggedUserContext } from 'context';
import { Redirect } from 'react-router-dom';

function Home() {
  const loggedUser = useContext(LoggedUserContext);

  return loggedUser !== null
    ? loggedUser.tipo === 'buyer'
      ? <Redirect to="/buy" />
      : <Redirect to="/my-patterns" />
    : (
      <>
        <ProductHero />
        <ProductHowItWorks />
      }
        <ProductCTA />
        <ProductSmokingHero />
      </>
    );
}

export default Home;
