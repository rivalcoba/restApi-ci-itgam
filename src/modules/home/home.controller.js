export function renderHomePage(_, res) {
  res.render('index', { title: 'ITGAM REST-API' });
}

export function test() {
  return 'test home';
}
