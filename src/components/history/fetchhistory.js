import axios from 'axios';

export async function fetchHistory(email) {
  console.log("fetchHistory", email)
  try {
    
    const response = await axios.get('http://127.0.0.1:8000/getPurchases', {
      params: { email } , 
    });
    if (response.data) {
      return convertToDesiredFormat(response.data);
    }
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
}


export async function convertToDesiredFormat(books) {
  const formattedBooks = [];

  for (const book of books) {
    try {
      // Fetch additional data for each book
      const bookInfoResponse = await axios.get(`http://127.0.0.1:8000/getBookInfo/${book.ISBN}`);
      const bookInfo = bookInfoResponse.data;
      
      // Map the data as needed
      const formattedBook = {
        isbn: bookInfo.ISBN,
        price: book.Price,
        category: bookInfo.Book_Category,
        title: bookInfo.Book_Title,
        author: bookInfo.Book_Author,
        img: [bookInfo.Cover_URL],
        purchase_date: book.Purchase_Date

      };

      formattedBooks.push(formattedBook);
    } catch (error) {
      console.error('Error fetching book info: ', error);
    }
  }

  return formattedBooks;
}