if (!window.localStorage.getItem('storageType')) window.localStorage.setItem('storageType', 'session');

export function setLocal() {
  window.localStorage.setItem('storageType', 'local');
}

export function setSession() {
  window.localStorage.setItem('storageType', 'session');
}

export default () => (
  window.localStorage.getItem('storageType') === 'local'
    ? window.localStorage
    : window.sessionStorage
);
