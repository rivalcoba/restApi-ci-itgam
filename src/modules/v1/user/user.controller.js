import User from './user.model';

// POST /api/v1/users/signup
export async function signUp(req, res) {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}

// POST /api/v1/users/login
export function login(req, res) {
  res.status(200).json(req.user);
}

export function test() {
  return 'test user';
}
