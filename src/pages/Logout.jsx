import React, { useContext, useEffect } from 'react';

import { LoggedUserContext, MessageContext } from 'context';
import { Redirect } from 'react-router-dom';
import getStorage, { setSession } from 'utils/storage';

function Logout() {
  getStorage().removeItem('loggedUser');
  setSession();

  const sendMessage = useContext(MessageContext);

  useEffect(() => sendMessage('Sessão encerrada.'));

  return (
    <LoggedUserContext.Provider value={null}>
      <Redirect to="/" />
    </LoggedUserContext.Provider>
  );
}

export default Logout;
