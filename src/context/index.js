import { createContext } from 'react';

export const LoggedUserContext = createContext(null);

export const MessageContext = createContext(null);

export const LoginContext = createContext(null);

export const LoadingContext = createContext({
  loading: false,
  setLoading: () => {},
});

export const CheckoutContext = createContext({
  item: null,
  setItem: () => {},
});
