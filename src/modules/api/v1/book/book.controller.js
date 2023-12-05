import httpStatus from 'http-status';
import Book from './book.model';
// recor registra o inserta los datos
// eslint-disable-next-line import/prefer-default-export
export async function record(req, res) {
  try {
    const book = await Book.create(req.body);
    return res.status(httpStatus.CREATED).json(book);
  } catch (e) {
    console.log('error 500');
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
  }
}
// Manda a llamar un dato del libro que es el id = ISBN
export async function getOneBook(req, res) {
  try {
    const bookid = await Book.findOne({ isbn: req.body.isbn });
    return res.status(httpStatus.CREATED).json(bookid);
  } catch (e) {
    console.log('error 500');
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
  }
}

// Manda a llamar todos los datos que contiene el libro
export async function getallBook(req, res) {
  try {
    const allbook = await Book.findOne(req.body);
    return res.status(httpStatus.CREATED).json(allbook);
  } catch (e) {
    console.log('error 500');
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
  }
}
// Manda a llamar por id
export async function updateOneBook(req, res) {
  try {
    const updatebookid = await Book.findOneAndUpdate({
      isbn: req.body.isbnToUpdate,
    });
    return res.status(httpStatus.CREATED).json(updatebookid);
  } catch (e) {
    console.log('error 500');
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
  }
}
