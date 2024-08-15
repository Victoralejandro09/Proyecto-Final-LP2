import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../services/api';
import './BookList.css'; 

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredBooks(
        books.filter(book =>
          book.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredBooks(books);
    }
  }, [search, books]);

  return (
    <div className="book-list-container">
      <h1>Lista de Libros</h1>
      <input
        type="text"
        placeholder="Buscar por título..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />
      <ul className="book-list">
        {filteredBooks.map(book => (
          <li key={book.id} className="book-item">
            <span className="book-title">{book.title}</span>
            <Link to={`/book/${book.id}`} className="detail-button">Ver Detalles</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default BookList;
