// GET: /
export function renderHomePage(_, res) {
  res.render('index', { title: 'ITGAM REST-API' });
}

export function fake() {
  return 'test home';
}
