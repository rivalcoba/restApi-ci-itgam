import httpStatus from 'http-status';

// GET /api/v1/users/test
export function test(_, res) {
  res.status(httpStatus.OK).json({
    result: 'ok',
    message: 'Este es la principal entrada del usuario',
  });
}

// GET /api/v1/users
export function getUser(req, res) {
  res.status(httpStatus.OK).json({
    result: 'ok',
    message: 'get users',
  });
}
