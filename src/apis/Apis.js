import axios from 'axios';

export const getCurrentBooksApi = async API_KEY => {
  try {
    const {data, status} = await axios.get(
      'https://openlibrary.org/people/mekBot/books/currently-reading',
    );

    return {success: true, data, status};
  } catch (error) {
    const status = (error && error.response && error.response.status) || null;
    return {success: false, data: error.message, status};
  }
};

export const getRecommendBooksApi = async () => {
  try {
    const {data, status} = await axios.get(
      'https://openlibrary.org/people/mekBot/books/want-to-read.json',
    );

    return {success: true, data, status};
  } catch (error) {
    const status = (error && error.response && error.response.status) || null;
    return {success: false, data: error.message, status};
  }
};

export const searchBooksApi = async book => {
  try {
    let formattedBookName;
    if (book.includes(' ')) {
      formattedBookName = book.replace(/\s/g, '+');
    } else {
      formattedBookName = book;
    }
    console.log(
      `https://openlibrary.org/search.json?title=${formattedBookName}`,
    );
    const {data, status} = await axios.get(
      `https://openlibrary.org/search.json?title=${formattedBookName}`,
    );

    return {success: true, data, status};
  } catch (error) {
    const status = (error && error.response && error.response.status) || null;
    return {success: false, data: error.message, status};
  }
};
