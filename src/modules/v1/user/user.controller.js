import HTTPStatus from 'http-status';
import User from './user.model';

// POST /api/v1/users/signup
export async function signUp(req, res) {
  try {
    const user = await User.create(req.body);
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

// POST /api/v1/users/login
export function login(req, res) {
  res.status(HTTPStatus.OK).json(req.user.toAuthJSON());
}

export function test() {
  return 'test user';
}
