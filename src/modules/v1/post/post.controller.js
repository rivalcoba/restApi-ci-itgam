import Post from './post.model';

// POST /api/v1/posts
export async function createPost(req, res) {
  try {
    // Creando un Post mediante un metodo estatico
    const post = await Post.createPost(req.body, req.user._id);
    return res.status(201).json(post);
  } catch (error) {
    console.log('Error in "createPost" action method');
    return res.status(400).json(error);
  }
}

export function mock() {
  return 0;
}
