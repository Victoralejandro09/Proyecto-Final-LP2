import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Asegúrate de importar axios
import { getBookById } from '../services/api'; // Importa la función correcta
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate(); // Usa useNavigate aquí

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookById(id);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      try {
        await axios.delete(`https://localhost:5001/api/books/${id}`);
        navigate('/books'); 
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  return (
    <div className="book-detail-container">
      <h1>Detalles del Libro</h1>
      <div className="book-detail">
        <p><strong>ID del libro:</strong> {book.id}</p>
        <p><strong>Título:</strong> {book.title}</p>
        <p><strong>Autor:</strong> {book.author}</p>
        <p><strong>Categoría:</strong> {book.category}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Fecha de Publicación:</strong> {book.publishedDate}</p>
      </div>
      <Link to="/books" className="back-button">Volver a la Lista</Link>
      <Link to={`/book-form?id=${id}`} className="edit-button">Editar Libro</Link>
      <button onClick={handleDelete} className="delete-button">
        Eliminar Libro
      </button>
    </div>
  );
};

export default BookDetail;
