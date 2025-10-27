export const isDevMode = () => {
  return (
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('diva-dev') !== null
  );
};
