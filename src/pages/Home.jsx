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
    ? <Redirect to="/buy" />
    : (
      <>
        <ProductHero />
        <ProductHowItWorks />
        {// <ProductValues />
      }
        <ProductCTA />
        <ProductSmokingHero />
      </>
    );
}

export default Home;
