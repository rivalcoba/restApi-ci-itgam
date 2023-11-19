import httpStatus from 'http-status';

// GET /api/v1/users/test
export function test(_, res) {
  res.status(httpStatus.OK).json({
    result: 'ok',
    message: 'Test Passed!! from users entry point',
  });
}

// Delete this function
export function foo(req, res) {
  res.status(httpStatus.OK).json({
    result: 'ok',
    message: 'create function',
  });
}
