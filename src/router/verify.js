export default (to, from, next) => {
  if (window.localStorage.getItem('token')) {
    next();
  } else {
    to.name === 'login' ? next() : next('/login');
  }
};
