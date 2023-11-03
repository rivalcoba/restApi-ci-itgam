import HTTPStatus from 'http-status';
import Post from './post.model';

// GET /api/v1/posts/<id>
export async function getPostById(req, res) {
  try {
    console.log(req.params.id);
    const post = await Post.findById(req.params.id);
    return res.status(HTTPStatus.OK).json(post);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

// POST /api/v1/posts
export async function createPost(req, res) {
  try {
    // Creando un Post mediante un metodo estatico
    const post = await Post.createPost(req.body, req.user._id);
    return res.status(HTTPStatus.CREATED).json(post);
  } catch (error) {
    console.log('Error in "createPost" action method');
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export function mock() {
  return 0;
}
