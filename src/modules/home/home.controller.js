const homeView = (req, res) => {
  res.render('home/homeView.hbs', {
    title: 'Inicio',
  });
};
export default {
  homeView,
};
