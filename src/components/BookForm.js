import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './BookForm.css'; // Importa el archivo CSS aquí

const BookForm = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    publishedDate: '',
    isbn: '',
    category: '' // Asegúrate de incluir el campo category
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const response = await axios.get(`https://localhost:5001/api/books/${id}`);
          setBook(response.data);
        } catch (error) {
          console.error('Error fetching book:', error);
        }
      };

      fetchBook();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Asegúrate de que la fecha esté en el formato correcto (yyyy-MM-dd)
    const formattedDate = new Date(book.publishedDate).toISOString().split('T')[0];
    const updatedBook = { ...book, publishedDate: formattedDate };

    try {
      if (id) {
        await axios.put(`https://localhost:5001/api/books/${id}`, updatedBook);
      } else {
        await axios.post('https://localhost:5001/api/books', updatedBook);
      }
      navigate('/'); 
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <div className="book-form-container">
      <h1>{id ? 'Editar Libro' : 'Agregar libro'}</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title" 
          value={book.title} 
          onChange={handleChange} 
          placeholder="Titulo" 
          required 
        />
        <input 
          type="text" 
          name="author" 
          value={book.author} 
          onChange={handleChange} 
          placeholder="Autor" 
          required 
        />
        <input 
          type="date" 
          name="publishedDate" 
          value={book.publishedDate} 
          onChange={handleChange} 
          placeholder="Fecha de publicacion" 
          required 
        />
        <input 
          type="text" 
          name="isbn" 
          value={book.isbn} 
          onChange={handleChange} 
          placeholder="ISBN" 
          required 
        />
        <input 
          type="text" 
          name="category" 
          value={book.category} 
          onChange={handleChange} 
          placeholder="Categoria" 
          required 
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default BookForm;
