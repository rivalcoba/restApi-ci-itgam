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

export function test() {
  return 'test user';
}
