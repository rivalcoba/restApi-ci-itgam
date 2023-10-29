const index = (req, res) => {
  res.render('index', {
    title: 'El archivo hom funcionando',
  });
};
export default {
  index,
};
