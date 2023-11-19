const homeView = (req, res) => {
  res.render('home/homeView.hbs', {
    title: 'El archivo hom funcionando',
  });
};
export default {
  homeView,
};
