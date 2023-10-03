import axios from 'axios';

export async function fetchAssets() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/getBooks');
    if (response.data) {
      return convertToDesiredFormat(response.data);
    }
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
}

function convertToDesiredFormat(data) {
  return data.map((book) => ({
    isbn: book.ISBN,
    category: book.Book_Category,
    title: book.Book_Title,
    author: book.Book_Author,
    price: book.Price,
    img: [book.Cover_URL],
  }));
}
