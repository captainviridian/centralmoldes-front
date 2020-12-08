import { LoggedUserContext, LoginContext, MessageContext } from 'context';
import React from 'react';
import PropTypes from 'prop-types';

function ApplicationContext({
  loggedUser,
  sendMessage,
  children,
}) {
  return (
    <LoggedUserContext.Provider value={loggedUser}>
      <MessageContext.Provider value={sendMessage}>
        {children}
      </MessageContext.Provider>
    </LoggedUserContext.Provider>
  );
}

ApplicationContext.propTypes = {
  loggedUser: PropTypes.shape({
    type: PropTypes.string,
    first_name: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default ApplicationContext;
