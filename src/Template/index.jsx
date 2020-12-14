import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AppAppBar as Header, DrawableMenu } from 'components/views';

import { useLocation } from 'react-router-dom';

import { Snackbar } from 'components/base';
import getStorage from 'utils/storage';
import ApplicationContext from './ApplicationContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  content: {
    padding: `${theme.spacing.headerSize}px 0px`,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

function Template({ children }) {
  const classes = useStyles();
  const { pathname } = useLocation();

  const [menuOptions, setMenuOptions] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const [loggedUser, setLoggedUser] = useState(null);

  const [infoMessage, setInfoMessage] = useState(null);

  const [item, setItem] = useState(null);

  // const [loading, setLoading] = useState(false);

  function openDrawableMenu() {
    setMenuOpen(true);
  }

  // logged user
  useEffect(() => {
    const user = JSON.parse(getStorage().getItem('loggedUser'));

    setLoggedUser(user);
  }, [pathname]);

  // menu options
  useEffect(() => {
    async function getMenuOptions() {
      const { notLogged, seller, buyer } = await import('./menuOptions');

      if (!loggedUser) setMenuOptions(notLogged);
      else if (loggedUser.type === 'seller') setMenuOptions(seller);
      else setMenuOptions(buyer);
    }

    getMenuOptions();
  }, [loggedUser]);

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ApplicationContext
      loggedUser={loggedUser}
      sendMessage={(message) => setInfoMessage(message)}
      checkout={{
        item,
        setItem: (id) => {
          setItem(id);
          getStorage().setItem('cart', id);
        },
      }}
    >
      <CssBaseline />
      <DrawableMenu
        links={menuOptions}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpen={openDrawableMenu}
        title={loggedUser && `Bem-vinda(o), ${loggedUser.first_name}`}
      />
      <Header menuOptions={menuOptions} onClickMenuButton={openDrawableMenu} />
      <main className={classes.content}>
        {children}
      </main>

      <Snackbar
        message={infoMessage}
        onClose={() => setInfoMessage(null)}
        open={Boolean(infoMessage)}
      />

      {/* <CircularProgress /> */}
    </ApplicationContext>
  );
}

Template.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Template;
