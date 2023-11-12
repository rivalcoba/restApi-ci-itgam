import httpStatus from 'http-status';

// GET /api/v1/users
export function getUser(_, res) {
  res.status(httpStatus.OK).json({
    result: 'ok',
    message: 'Test: /api/v1/users',
  });
}

// GET /api/v1/users/test
export function test(_, res) {
  res.status(httpStatus.OK).json({
    result: 'ok',
    message: 'Test Passed!! from users entry point',
  });
}
