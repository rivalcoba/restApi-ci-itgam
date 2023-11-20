import httpStatus from 'http-status';

// GET /api/v1/users/test
export function test(_, res) {
  res.status(httpStatus.OK).json({
    result: 'ok',
    message: 'Este es la principal entrada del usuario',
  });
}

// Delete this function
export function foo(req, res) {
  res.status(httpStatus.OK).json({
    result: 'ok',
    message: 'create function',
  });
}
